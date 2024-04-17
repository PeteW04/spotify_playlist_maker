import React, { useState } from 'react';

function SearchBar({ onSubmit }) {
    const [searchText, setSearchText] = useState("");

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="searchText" value={searchText} onChange={handleChange} placeholder='Search for Songs' />
            </form>
        </div>
    );
}

export default SearchBar;