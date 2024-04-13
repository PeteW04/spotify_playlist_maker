import React from 'react';

function Track({ track_title, artist }) {
    return (
        <div>
            <h4 className='trackTitle'>{track_title}</h4>
            <p className='artist'>{artist}</p>
            <button className='addToPlaylist'>+</button>
        </div>
    );
}

export default Track;