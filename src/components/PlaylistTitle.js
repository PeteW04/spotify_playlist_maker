import React from 'react';

const PlaylistTitle = ({ playlistTitle, setPlaylistTitle }) => {
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