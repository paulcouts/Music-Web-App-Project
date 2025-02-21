from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from decouple import config
from googleapiclient.discovery import build

app = Flask(__name__)
CORS(app)

YOUTUBE_API_KEY = config('API_KEY')
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        search_response = youtube.search().list(
            q=query,
            part='snippet',
            type='video',
            maxResults=20,
        ).execute()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    music_keywords = ['music', 'song', 'track', 'album', 'official']
    results = []
    prioritized_results = []

    for item in search_response.get('items', []):
        video = {
            'videoId': item['id']['videoId'],
            'title': item['snippet']['title'],
            'thumbnail': item['snippet']['thumbnails']['default']['url']
        }
        title = item['snippet']['title'].lower()
        if any(keyword in title for keyword in music_keywords):
            prioritized_results.append(video)
        else:
            results.append(video)

    final_results = prioritized_results + results
    return jsonify(final_results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
