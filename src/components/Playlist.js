import React, { useState } from 'react';
import TrackList from './TrackList';
import SaveToSpotify from './SaveToSpotify';
import PlaylistTitle from './PlaylistTitle';
import getSpotifyAccessToken from './SpotifyKey';

function Playlist({ tracks, onRemove, accessToken }) {
    const [playlistTitle, setPlaylistTitle] = useState("Playlist Title");
    function onSave() {
        const uris = tracks.map(track => track.uri);

        fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetch("https://api.spotify.com/v1/users/" + data.id + "/playlists", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ "name": playlistTitle })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const playlistId = data.id;
                        fetch("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${accessToken}`,
                            },
                            body: JSON.stringify({ "uris": uris })
                        })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.error("Error: ", error))
                    })
            }
            )
            .catch(error => console.error("Error: ", error))


    }

    return (
        <div>
            <PlaylistTitle playlistTitle={playlistTitle} setPlaylistTitle={setPlaylistTitle}></PlaylistTitle>
            <TrackList tracks={tracks} onRemove={onRemove}></TrackList>
            <SaveToSpotify onSave={onSave}></SaveToSpotify>
        </div>
    );
}

export default Playlist;