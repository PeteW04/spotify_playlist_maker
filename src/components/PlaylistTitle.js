import React, { useState } from 'react';

const PlaylistTitle = () => {
    const [playlistTitle, setPlaylistTitle] = useState("Playlist Title");
    const handleTitleChange = (event) => {
        setPlaylistTitle(event.target.value);
    };

    return (
        <input
            type="text"
            className="playlist-title"
            value={playlistTitle}
            onChange={handleTitleChange}
            placeholder="Playlist Title"
        />
    );
};

export default PlaylistTitle;