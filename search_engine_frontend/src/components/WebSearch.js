import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import "./WebSearch.css";
import { FaSearch } from "react-icons/fa";

//auth: "AIzaSyAQ1I3CQT93_CxTU9P69vjrEK5YDRWSUB8"

export const WebSearch = () => {

    const [query, setQuery] = useState("");         // search bar input
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${'AIzaSyAQ1I3CQT93_CxTU9P69vjrEK5YDRWSUB8'}&cx=${'250bde6da254a407d'}&q=${query}`);
        const data = await response.json();
        setResults(data.items);
    };
      

    return <div className="web-main">
        <Link to="/local" id="link"> <button className="btn-switch">SWITCH TO LOCAL</button> </Link>

        <div className="input-wrapper-web">
            <div>
                <FaSearch id="search-icon-web" />
                <input
                    id="input-web"
                    placeholder="Type to search.."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
            <button className="btn-search" onClick={handleSearch}>Search</button>

            <div className="results-wrapper">
                {results && results.length > 0 && (
                    <div>
                    {results.map((result) => (
                        <div key={result.link} className="web-snippet">
                        <a href={result.link}>{result.title}</a>
                        <p id="web-snippet">{result.snippet}</p>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    </div>
};