import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoSearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const searchVideos = async () => {
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(query),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter video name"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchVideos} />
      {selectedVideo ? (
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${selectedVideo}?autoplay=1` }}
          style={styles.videoPlayer}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.videoId}
          renderItem={({ item }) => (
            <View style={styles.videoItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <TouchableOpacity onPress={() => setSelectedVideo(item.videoId)}>
                <Text style={styles.playButton}>Play Video</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
  videoItem: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  playButton: {
    color: 'blue',
    marginTop: 5,
  },
  videoPlayer: {
    height: 300,
  },
});
