import './App.css';

import { Routes, Route } from "react-router-dom";

import { WebSearch } from "./components/WebSearch";
import { LocalSearch } from "./components/LocalSearch";


function App() {
  return (
    <div className="App">
      <div className="main">

        <Routes>
          <Route path='/' element={<WebSearch />} />
          <Route path='/local' element={<LocalSearch />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
