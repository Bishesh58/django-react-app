import React from "react";
import "./Home.css";
import Map from "../Map/Map";
import SearchBar from "../Search/SearchBar";


function Home() {
  return (
    <div className="home">
        <SearchBar/>
      <Map />
    </div>
  );
}

export default Home;
