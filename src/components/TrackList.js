import React, { useState } from 'react';
import Track from './Track'

function TrackList(props) {
    return (
        <div>
            {props.tracks.map(track => <Track track_title={track.track_title} artist={track.artist} />)}
        </div>
    );
}

export default TrackList;