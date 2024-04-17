import React from 'react';

function Track({ track, track_title, artist, onAdd, onRemove }) {

    return (
        <div>
            <h4 className='trackTitle'>{track_title}</h4>
            <p className='artist'>{artist}</p>
            {onAdd && <button onClick={() => onAdd(track)}>Add</button>}
            {onRemove && <button onClick={() => onRemove(track.id)}>Remove</button>}
        </div>
    );
}

export default Track;