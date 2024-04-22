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
    return (
      <div className="App">
        <div className="flex flex-col bg-stone-900 min-h-screen">
          <Login />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="flex flex-col bg-stone-900 min-h-screen">
        <div className='flex justify-between items-center'>
          <h1 className="text-5xl flex-grow text-slate-100 font-bold leading-snug truncate mb-1 sm:mb-0">Playlist Builder for Spotify</h1>
          <button className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded" id="logout" onClick={() => { localStorage.removeItem("access_token"); localStorage.removeItem("access_token"); window.location.reload(); }}>LOGOUT</button>
        </div>
        <div className="container mx-auto">
          <SearchBar setTracks={setTracks} accessToken={accessToken} />
        </div>
        <div className="mb-14 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <SearchResults onAdd={addToPlaylist} tracks={tracks} />
          <Playlist onRemove={removeFromPlaylist} tracks={playlist} accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
}

export default App;
