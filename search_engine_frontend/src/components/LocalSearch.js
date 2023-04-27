import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniSearch from "minisearch";

import "./LocalSearch.css";
import { FaSearch } from "react-icons/fa";

export const LocalSearch = () => {

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        // read csv file
        const response = await fetch('./lyrics.csv');
        const text = await response.text();

        // parse csv data into array of objects
        const data = text.split('\n').map(row => {
            const columns = row.split(',');
            return {
                Rank: columns[0],
                Song: columns[1],
                Artist: columns[2],
                Year: columns[3],
                Lyrics: columns[4],
                Source: columns[5]
            };
        });

        // make unique ID
        data.forEach((entry, i) => {
            entry.id = entry.Song + "-" + entry.Artist + "-" + entry.Year
        })
    
        // init and setup MiniSearch
        const searchIndex = new MiniSearch({
            // fields to index
            fields: ["Rank","Song","Artist","Year","Lyrics","Source"],
    
            // fields to be returned
            storeFields: ["Rank","Song","Artist","Year","Lyrics","Source"],
    
            // search options
            searchOptions: {
                boost: { Song: 2, Artist: 1 },
                prefix: true,
                //fuzzy: 0.25
            },
            
            //idField: "Song"
        });
        searchIndex.addAll(data);

        // search for the query term
        let searchResults = searchIndex.search(query);
    
        // update the search results
        setSearchResults(searchResults);

        console.log(searchResults);
      };

    return <div>
        <Link to="/"> <button>SWITCH TO WEB</button> </Link>
        
        <div className="input-wrapper-local">
            <div>
                <FaSearch id="search-icon" />
                <input id="input-local" placeholder="Type to search.." value={query} onChange={(e) => setQuery(e.target.value)}/>
            </div>
            <button onClick={handleSearch}>Search</button>

            <div className="result-wrapper">
                {searchResults.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map(result => (
                            <tr key={result.id}>
                                <td>{result.Song}</td>
                                <td>{result.Artist}</td>
                                <td>{result.Year}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
};