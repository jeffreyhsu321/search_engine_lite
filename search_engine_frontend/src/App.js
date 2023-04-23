import logo from './logo.svg';
import './App.css';

import { SearchBar } from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <div className="main">
        <SearchBar/>
        <div> Search Results </div>
      </div>
    </div>
  );
}

export default App;
