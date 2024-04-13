import React, { useState } from 'react';

function SearchBar() {
    const [searchText, setSearchText] = useState("");

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = () => {

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="searchText" value={searchText} onChange={handleChange} placeholder='Search for Songs' >Search for Songs</input>
            </form>
        </div>
    );
}

export default SearchBar;