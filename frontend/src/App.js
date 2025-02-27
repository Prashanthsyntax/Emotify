import React, { useState } from 'react';
import './styles/App.css'; // Assuming you have your CSS here
import axios from 'axios';
import VideoStream from './components/VideoStream'; // Importing the VideoStream component

function App() {
  const [mood, setMood] = useState(null);
  const [playlistUri, setPlaylistUri] = useState(null);
  const [error, setError] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false); // State to control webcam visibility

  // Fetch mood-based music recommendation from Flask backend
  const fetchMusicRecommendation = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recommend-music');
      const { emotion, playlist_uri } = response.data;
      if (response.status === 200) {
        setMood(emotion);
        setPlaylistUri(playlist_uri);
        setError(null); // Reset error if request is successful
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred while fetching the music recommendation.');
      console.error("Error fetching music recommendation:", error);
    }
  };

  // Handle button click to toggle webcam visibility
  const handleWebcamButtonClick = () => {
    setShowWebcam(prevState => !prevState); // Toggle the webcam visibility
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">✨ Emotify</h1>
        <p className='slogan'>😊Feel the Beat, Embrace the Mood!💕</p>
        <button className="login-btn">Log in</button>
      </header>

      <main className="main-content">
        <section className="video-section">
          <h2 className="subtitle">Find Your Vibe, Hit Play!</h2>
          <div className="video-container">
            {/* Conditionally render VideoStream component based on showWebcam */}
            {showWebcam && <VideoStream />}
          </div>
          {/* Toggle button to open and close the webcam */}
          <button className="fetch-btn" onClick={handleWebcamButtonClick}>
            {showWebcam ? 'Close Webcam' : 'Open Webcam'}
          </button>
          <button className="fetch-btn" onClick={fetchMusicRecommendation}>
            Get Music Recommendation
          </button>
        </section>

        <section className="result-section">
          <h2 className="subtitle">Your Recommended Playlist</h2>
          <div id="result" className="result">
            {error && <p className="error-message">{error}</p>}
            {mood && !error && (
              <>
                <p className="emotion-text">
                  Emotion Detected: <strong>{mood}</strong>
                </p>
                <a
                  href={`https://open.spotify.com/playlist/${playlistUri.split(':').pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="playlist-link"
                >
                  Open Playlist on Spotify
                </a>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Mood-Based Music Player. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
