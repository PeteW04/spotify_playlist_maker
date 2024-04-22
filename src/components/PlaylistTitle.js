import React from 'react';

const PlaylistTitle = ({ playlistTitle, setPlaylistTitle }) => {
    const handleTitleChange = (event) => {
        setPlaylistTitle(event.target.value);
    };

    return (
        // <input
        //     type="text"
        //     className="playlist-title mb-1"
        //     value={playlistTitle}
        //     onChange={handleTitleChange}
        //     placeholder="Playlist Title"
        // />
        <div class="bg-#14532d p-4 rounded-lg">
            <div class="relative bg-inherit">
                <input type="text"
                    value={playlistTitle}
                    onChange={handleTitleChange}
                    placeholder="Playlist Title"
                    id="username"
                    name="username"
                    className="text-xl peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-green-900 mb-1" />

            </div>
        </div>
    );
};

export default PlaylistTitle;