import React from 'react';
import TrackList from './TrackList';
import SaveToSpotify from './SaveToSpotify';
import PlaylistTitle from './PlaylistTitle';

function Playlist({ tracks, onSave, onRemove }) {
    return (
        <div>
            <PlaylistTitle></PlaylistTitle>
            <TrackList tracks={tracks} onRemove={onRemove}></TrackList>
            <SaveToSpotify onSave={onSave}></SaveToSpotify>
        </div>
    );
}

export default Playlist;