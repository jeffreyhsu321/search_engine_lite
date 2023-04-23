import React from "react";
import {useState} from "react";

import {FaSearch} from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = () => {

    const [query, setQuery] = useState("");     // search bar input

    const fetchData = (value) => {

    }

    return <div className="input-wrapper"> 
        <FaSearch id="search-icon"/>
        <input 
            placeholder="Type to search.." 
            value={query} 
            onChange={(e) => setQuery(e.target)}
        />
    </div>
};