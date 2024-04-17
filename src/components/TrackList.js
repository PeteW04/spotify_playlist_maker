import React from 'react';
import Track from './Track'

function TrackList(props) {
    if (props.tracks) {
        return (
            <div>
                {props.tracks.map(track => <Track track={track} track_title={track.title} artist={track.artist} onAdd={props.onAdd} onRemove={props.onRemove} />)}
            </div>
        );
    }
}

export default TrackList;