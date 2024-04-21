import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import { useState, useEffect } from 'react';
import { getToken } from './auth';
import Login from './components/Login';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);


  useEffect(() => {
    const validateToken = async () => {
      if (accessToken) {
        console.log(accessToken);
        try {
          const response = await fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          });
          if (!response.ok) {
            throw new Error('Token validation failed');
          }
          // Token is valid
          console.log("Token is valid.");
        } catch (error) {
          console.error("Token is invalid, clearing token:", error);
          localStorage.removeItem("access_token");
          setAccessToken(null);
        }
      }
    };

    validateToken();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log("Code from URL:", code); // Verify you're getting the code

    if (!accessToken && code) {
      getToken(code).then(accessToken => {
        console.log("New token received:", accessToken); // Check what you get as a token
        setAccessToken(accessToken);
        localStorage.setItem("access_token", accessToken);
        window.history.pushState({}, null, '/'); // Clear the query parameters from the URL
      }).catch(err => {
        console.error('Error during authentication:', err);
      });
    }
  }, [accessToken]);

  const addToPlaylist = (track) => {
    if (!playlist.some(item => item.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeFromPlaylist = (trackIdToRemove) => {
    setPlaylist(playlist => playlist.filter(track => track.id !== trackIdToRemove));
  };

  if (!accessToken) {
    return <Login />;
  }

  return (
    <div className="App">
      <SearchBar setTracks={setTracks} accessToken={accessToken} />
      <SearchResults onAdd={addToPlaylist} tracks={tracks} />
      <Playlist onRemove={removeFromPlaylist} tracks={playlist} accessToken={accessToken} />
      <button id="logout" onClick={() => { localStorage.removeItem("access_token"); }}>LOGOUT</button>
    </div>
  );
}

export default App;
