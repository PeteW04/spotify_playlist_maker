import React, { useState, useEffect } from 'react';
import { refreshToken } from '../auth';

function SearchBar({ setTracks, accessToken }) {
    const [searchText, setSearchText] = useState("");

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        if (!searchText) return;
        if (!accessToken) {
            refreshToken();
        }
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
        // <div>
        //     <form>
        //         <input type="text" name="searchText" value={searchText} onChange={handleChange} placeholder='Search for Songs' />
        //     </form>
        // </div>
        <div className="relative">
            {/* <label htmlFor="Search" className="sr-only"> Search </label> */}

            <input
                type="text"
                name="searchText"
                value={searchText}
                onChange={handleChange}
                id="Search"
                placeholder="Search for songs..."
                className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm mb-4 mt-2"
            />

            {/* <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span> */}
        </div>
    );
}

export default SearchBar;