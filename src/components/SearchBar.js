import React, { useState, useEffect } from 'react';
import getSpotifyAccessToken from './SpotifyKey';

function SearchBar({ setTracks, accessToken }) {
    const [searchText, setSearchText] = useState("");

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    // useEffect(() => {
    //     if (!searchText) return;
    //     getSpotifyAccessToken().then(token => {
    //         const url = new URL("https://api.spotify.com/v1/search");
    //         url.search = new URLSearchParams({
    //             q: searchText,
    //             type: "track",
    //             limit: 10
    //         }).toString();
    //         console.log(url);

    //         fetch(url, {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //             }
    //         })
    //             .then(response => {
    //                 if (!response.ok) {
    //                     throw new Error('Failed to fetch search results, status: ' + response.status);
    //                 }
    //                 return response.json();
    //             })
    //             .then(data => {
    //                 console.log(data);
    //                 setTracks(data.tracks.items);
    //             })
    //             .catch(error => console.error('Error:', error));
    //     })
    //         .catch(error => {
    //             console.error('Error fetching access token:', error);
    //         });
    // }, [searchText, setTracks])
    useEffect(() => {
        if (!searchText) return;

        const url = new URL("https://api.spotify.com/v1/search");
        url.search = new URLSearchParams({
            q: searchText,
            type: "track",
            limit: 10
        }).toString();
        console.log(url);
        console.log(accessToken)

        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch search results, status: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTracks(data.tracks.items);
            })
            .catch(error => console.error('Error:', error));

    }, [searchText, setTracks, accessToken])

    return (
        <div>
            <form>
                <input type="text" name="searchText" value={searchText} onChange={handleChange} placeholder='Search for Songs' />
            </form>
        </div>
    );
}

export default SearchBar;