from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('search.html')

@app.route('/search', methods=['POST'])
def search_videos():
    query = request.form.get('query')

    results = [
        {'title': 'Video 1', 'thumbnail': 'thumbnail1.jpg', 'videoId': 'video1'},
        {'title': 'Video 2', 'thumbnail': 'thumbnail2.jpg', 'videoId': 'video2'}
    ]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
