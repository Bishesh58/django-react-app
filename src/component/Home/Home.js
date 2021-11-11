import React from "react";
import "./Home.css";
import GMap from "../Map/GMap";
import SearchBar from "../Search/SearchBar";

function Home() {
  return (
    <div className="home">
      <div className="home-search">
        <SearchBar />
      </div>
      <div className="home-map">
        <GMap />
      </div>
    </div>
  );
}

export default Home;
