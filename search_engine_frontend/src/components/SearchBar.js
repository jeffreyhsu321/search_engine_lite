import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

//auth: "AIzaSyAQ1I3CQT93_CxTU9P69vjrEK5YDRWSUB8"

export const SearchBar = () => {

    const [query, setQuery] = useState("");         // search bar input
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${'AIzaSyAQ1I3CQT93_CxTU9P69vjrEK5YDRWSUB8'}&cx=${'250bde6da254a407d'}&q=${query}`);
        const data = await response.json();
        setResults(data.items);
    };
      

    return <div>
        <Link to="/local"> <button className="btn-main">SWITCH TO LOCAL</button> </Link>

        <div className="input-wrapper-web">
            <div>
                <FaSearch id="search-icon-web" />
                <input
                    id="input-web"
                    placeholder="Type to search.."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button className="btn-main" onClick={handleSearch}>Search</button>

            <div className="results-wrapper">
                {results && results.length > 0 && (
                    <div>
                    {results.map((result) => (
                        <div key={result.link}>
                        <a href={result.link}>{result.title}</a>
                        <p>{result.snippet}</p>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    </div>
};