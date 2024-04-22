import React from 'react';
import Track from './Track'

function TrackList(props) {
    if (props.tracks) {
        return (
            <div className="flex-grow">
                {props.tracks.map(track => <Track key={track.id} track={track} track_title={track.name} onAdd={props.onAdd} onRemove={props.onRemove} />)}
            </div>
        );
    }
}

export default TrackList;