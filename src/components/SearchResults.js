import React from 'react';
import TrackList from './TrackList';

function SearchResults({ tracks, onAdd }) {

    return (
        <div className="rounded-lg h-10 mt-6 mb-xl">
            <h2 className="text-4xl text-slate-100 leading-snug truncate mb-1 sm:mb-0">Results</h2>
            <TrackList tracks={tracks} onAdd={onAdd} ></TrackList>
        </div>
    );
}

export default SearchResults;