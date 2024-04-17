import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist';
import { useState } from 'react';

function App() {
  const [tracks, setTracks] = useState([{ title: "track 1", artist: "pete white", id: 1 }, { title: "track 2", artist: "pete white", id: 2 }, { title: "track 3", artist: "pete white", id: 3 }])
  const addToTracks = (track) => {
    if (tracks.includes(track)) {
      return;
    }
    setTracks([...tracks, track]);
  };

  const [playlist, setPlaylist] = useState([]);
  const addToPlaylist = (track) => {
    if (playlist.includes(track)) {
      return;
    }
    setPlaylist([...playlist, track]);
  };

  const removeFromPlaylist = (trackIdToRemove) => {
    setPlaylist(playlist => playlist.filter(track => track.id !== trackIdToRemove));
  };

  return (
    <div className="App">
      <SearchBar onSearch={addToTracks}></SearchBar>
      <SearchResults onAdd={addToPlaylist} tracks={tracks}></SearchResults>
      <Playlist onRemove={removeFromPlaylist} tracks={playlist}></Playlist>
    </div>
  );
}

export default App;
