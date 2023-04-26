import logo from './logo.svg';
import './App.css';

import { SearchBar } from "./components/SearchBar";
import { LocalSearch } from "./components/LocalSearch";

function App() {
  return (
    <div className="App">
      <div className="main">
        <SearchBar/>
        <LocalSearch />
      </div>
    </div>
  );
}

export default App;
