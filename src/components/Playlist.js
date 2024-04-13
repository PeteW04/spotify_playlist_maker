import React, { useState } from 'react';
import TrackList from './TrackList';
import SaveToSpotify from './SaveToSpotify';

function Playlist() {
    const [playlistTitle, setPlaylistTitle] = useState("Playlist Title");

    const handleChange = (e) => {
        setPlaylistTitle(e.target.value);
    };

    return (
        <div>
            <h2 name="playlist_title" value={playlistTitle} onChange={handleChange}></h2>
            <TrackList></TrackList>
            <SaveToSpotify></SaveToSpotify>
        </div>
    );
}

export default Playlist;