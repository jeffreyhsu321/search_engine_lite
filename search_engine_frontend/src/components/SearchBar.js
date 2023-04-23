import React from "react";

import {FaSearch} from "react-icons/fa"

export const SearchBar = () => {
    return <div className="input-wrapper"> 
        <FaSearch if="search-icon"/>
        <input placeholder="Type to search.." />
    </div>
};