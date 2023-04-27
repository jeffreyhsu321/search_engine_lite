
# Search Engine Lite
APRIL 2023
___

## LINKS
---
[Github](https://github.com/jeffreyhsu321/search_engine_lite) (https://github.com/jeffreyhsu321/search_engine_lite)

[Website](https://search-engine-lite-uu36adnl7a-uc.a.run.app) (https://search-engine-lite-uu36adnl7a-uc.a.run.app)


## APP BASICS
___
- React.js app
- initialized with `npm react-create-app`

##### Hosting
- continuous deployment on Google Cloud's Cloud Run service
- each push to remote branch (Github) will trigger a new build and deployment

> note: cold start is enabled to save on costs, so initial visit to the web page will be significantly longer than usual

## WEB SEARCH
___
##### Programmable Search Engine by Google

1. Obtain an **API key**
`AIzaSyAQ1I3CQT93_CxTU9P69vjrEK5YDRWSUB8`

2. Create a custom search engine and obtain CX (engine ID)
`250bde6da254a407d`

3. Simple fetch from the custom search engine
```javascript
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

const API_KEY = 'AIzaSyAQ1I3CQT93_CxTU9P69vjrEK5YDRWSUB8'
const CX = '250bde6da254a407d'
const URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`
  

const handleSearch = async () => {

	const response = await fetch(URL);
	const data = await response.json();
	setResults(data.items);

};
```

> test link to engine:   https://cse.google.com/cse?cx=250bde6da254a407d


4. UI: Input bar
```javascript
<input
	placeholder="Type to search.."
	value={query}
	onChange={(e) => setQuery(e.target.value)}   // sets query
	onKeyDown={handleSearch}    // detects user pressing enter
/>
```
- search is done on every key press just as a fun effect

4. UI: Search button
```javascript
<button onClick={handleSearch}>Search</button>
```
- calls `the handleSearch()` function in step 3

4. UI: Results (snippets)
```javascript
{results && results.length > 0 && (  // short circuit shortcut

	<div>
		{results.map((result) => (
			<div key={result.link} className="web-snippet">
				<a href={result.link}>{result.title}</a>
				<p id="web-snippet">{result.snippet}</p>
			</div>
		))}
	</div>

)}
```
- short circuit shortcut that only shows the results if there are any to show



## LOCAL SEARCH
---
##### MiniSearch
> `MiniSearch` is a tiny but powerful in-memory fulltext search engine written in JavaScript. It is respectful of resources, and it can comfortably run both in Node and in the browser.

1. Initialization and setting parameters
```javascript
const searchIndex = new MiniSearch({
	// fields to index
	fields: ["Rank","Song","Artist","Year","Lyrics","Source"],
	
	// fields to be returned
	storeFields: ["Rank","Song","Artist","Year","Lyrics","Source"],

	// index term processing
	processTerm: (term) =>
		stopWords.has(term) ? null : term.toLowerCase(), 

	// search options
	searchOptions: {
		boost: { Song: 1, Artist: 5 },    // field weighting
		prefix: true,                     // emulates stemming
		fuzzy: 0.25,
		processTerm: (term) => term.toLowerCase(), // search query processing

	fieldsWithHit: ["Lyrics"]  // for generating snipets
}
//idField: "Song"  // for if want to specify a different id field
});
```
- in hindsight: the ranking probably doesn't need to be indexed

2. Construct unique ID
- MiniSearch requires unique ID for each document, however there are duplicate entries for every field (identical song names, artists, etc).
- Solution: construct unique ID by combing certain fields
```javascript
data.forEach((entry, i) => {
	entry.id = entry.Song + "-" + entry.Artist + "-" + entry.Year
})
```

<div style="page-break-after: always;"></div>

3. Construct snippets
```javascript
searchResults = searchResults.map(result => {
	const lyrics = result.Lyrics;
	const searchTerm = query.toLowerCase();
	const index = lyrics.toLowerCase().indexOf(searchTerm);
	const snippetStart = Math.max(index - snippetLength / 2, 0);
	const snippetEnd = Math.min(index + searchTerm.length + snippetLength / 2, lyrics.length);
	const snippet = lyrics.substring(snippetStart, snippetEnd);
	
return { ...result, snippet};
});
```
- snippet is constructed by "highlighting" roughly `snippetLength/2` characters before and after the found query in the document
- problems:
	- snippets are able to grab content from preceding documents
	- snippets might contain words that were cut off
	- snippets do not prioritize popular sections of a song 
		- (e.g it grabs the first matching term)

- incomplete feature: to generate images to reflect the fetched documents

<div style="page-break-after: always;"></div>


## SCREENSHOTS
- web search![web search](./search_engine_frontend/ss/search-engine-lite-ss-01.png)
- local search![local search](./search_engine_frontend/ss/search-engine-lite-ss-02.png)
- local search - clicking on \[view lyrics\]![lyrics modal](./search_engine_frontend/ss/search-engine-lite-ss-03.png)