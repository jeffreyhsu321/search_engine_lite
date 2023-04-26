import React from "react";
import { useState } from 'react';
import MiniSearch from "minisearch";


export const LocalSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const mockData = [{
        id: 1,
        title: "FIRST",
        description: "This is the description for the first title.",
        price: 10
    }]


    const handleSearch = async () => {
        // // Read the CSV file
        const response = await fetch('./lyrics.csv');
        const text = await response.text();

        // Parse the CSV data into an array of objects
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

        data.forEach((entry, i) => {
            entry.id = entry.Song + "-" + entry.Artist + "-" + entry.Year

            console.log(entry.id);
        })
    
        const searchIndex = new MiniSearch({
            // fields to index
            fields: ["Rank","Song","Artist","Year","Lyrics","Source"],
    
            // fields to be returned
            storeFields: ["Rank","Song","Artist","Year","Lyrics","Source"],
    
            searchOptions: {
                boost: { Song: 2, Artist: 1 },
                prefix: true,
                fuzzy: 0.25
            },
            
            //idField: "Song"
        });
        searchIndex.addAll(data);

        // Search for the query term
        let searchResults = searchIndex.search("beatles");
    
        // Update the search results
        setSearchResults(searchResults);

        console.log(searchResults);
      };

    return <div>
        <div>
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {searchResults.length > 0 && (
                <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map(result => (
                    <tr key={result.id}>
                        <td>{result.id}</td>
                        <td>{result.title}</td>
                        <td>{result.description}</td>
                        <td>{result.price}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </div>
    </div>
};