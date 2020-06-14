import React from 'react';
import SearchComponent from "./components/search"
import Map from "./components/map"
import 'antd/dist/antd.css';
import './css/App.css';


function App() {
  return (
    <div className="App">
      <div className="App__search perfect_scroll">
        <SearchComponent />
      </div>
      <div className="App__map">
        <Map />
      </div>
    </div>
  );
}

export default App;
