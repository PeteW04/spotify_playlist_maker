import React from 'react';

function SaveToSpotify({ onSave }) {
    return (
        <button className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="saveToSpotify" onClick={onSave}>Save to Spotify</button>
    );
}

export default SaveToSpotify;