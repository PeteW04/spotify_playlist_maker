import React from 'react';

function Track({ track, track_title, onAdd, onRemove }) {

    const artistNames = track.artists.map(artist => artist.name).join(', ');

    return (
        // <div>
        //     <h4 className='trackTitle'>{track_title}</h4>
        //     {track.artists.map(artist => <p key={artist.id} >{artist.name}</p>)}
        //     {onAdd && <button onClick={() => onAdd(track)}>Add</button>}
        //     {onRemove && <button onClick={() => onRemove(track.id)}>Remove</button>}
        // </div>
        <div class="max-w-xl mx-auto bg-green-600 shadow-lg rounded-lg mb-2">
            <div className="px-4">
                <div className="flex items-start">
                    <div className="flex-grow truncate">
                        <div className="sm:flex justify-between items-center mb-3">
                            <div className="flex flex-col items-start flex-grow min-w-0 truncate">
                                <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">{track_title}</h2>
                                <div className="max-w-md text-indigo-100">
                                    {/* {track.artists.map(artist => <p class="mb-2" key={artist.id} >{artist.name}</p>)} */}
                                    <p className="">{artistNames}</p>
                                </div>
                            </div>
                            <div className="flex items-end justify-between whitespace-normal">
                                {onRemove && <a onClick={() => onRemove(track.id)} className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                                    <span className="block font-bold"><span class="sr-only">Remove from Playlist</span>-</span>
                                </a>}
                                {onAdd && <a onClick={() => onAdd(track)} className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                                    <span class="block font-bold"><span className="sr-only">Add to Playlist</span>+</span>
                                </a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Track;