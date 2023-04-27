import React, { useState } from "react";
import { Link } from 'react-router-dom';
import MiniSearch from "minisearch";

import "./LocalSearch.css";
import { FaMusic } from "react-icons/fa";

import Card from "../components/Card.js";

export const LocalSearch = () => {

    /*----------QUERY AND SEARCH RESULTS----------*/
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

        let stopWords = new Set(['and', 'or', 'to', 'in', 'a', 'the'])
    
        // init and setup MiniSearch
        const searchIndex = new MiniSearch({
            // fields to index
            fields: ["Rank","Song","Artist","Year","Lyrics","Source"],
    
            // fields to be returned
            storeFields: ["Rank","Song","Artist","Year","Lyrics","Source"],
    
            processTerm: (term) =>
                stopWords.has(term) ? null : term.toLowerCase(), // index term processing

            // search options
            searchOptions: {
                boost: { Song: 1, Artist: 5 },
                prefix: true,
                fuzzy: 0.25,
                processTerm: (term) => term.toLowerCase(), // search query processing
                fieldsWithHit: ["Lyrics"]
            }
            
            //idField: "Song"
        });
        searchIndex.addAll(data);

        // search for the query term
        let searchResults = searchIndex.search(query);
    
        // update the search results
        const snippetLength = 100; // adjust this value as needed
        searchResults = searchResults.map(result => {
            const lyrics = result.Lyrics;
            const searchTerm = query.toLowerCase();
            const index = lyrics.toLowerCase().indexOf(searchTerm);
            const snippetStart = Math.max(index - snippetLength / 2, 0);
            const snippetEnd = Math.min(index + searchTerm.length + snippetLength / 2, lyrics.length);
            const snippet = lyrics.substring(snippetStart, snippetEnd);
            return {
                ...result,
                snippet
            };
        });
        setSearchResults(searchResults);

        console.log(searchResults);
    };
      

    return <div>
        <Link to="/"> <button className="btn-switch">SWITCH TO WEB</button> </Link>
        
        <div className="input-wrapper-local">

            <FaMusic id="search-icon-local" />
            <input 
                id="input-local" 
                placeholder="Type to search.." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') { this.search() }}}
            />

            <button className="btn-search" onClick={handleSearch}>Search</button>

            <div className="result-wrapper">
                {searchResults.length > 0 && (
                    <div className="card-row">
                        { searchResults.map(result => (
                                <Card
                                    title={result.Song.replace(/["']/g, "")}
                                    imageUrl=''
                                    body={".. "+result.snippet.replace(/["']/g, "")+" .."}
                                    artist={result.Artist.replace(/["']/g, "")}
                                    rank={result.Rank}
                                    year={result.Year}
                                    lyrics={result.Lyrics}
                                    snippet={result.snippet}
                                />
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
};