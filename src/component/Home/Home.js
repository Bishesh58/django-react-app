import React, { useEffect } from "react";
import "./Home.css";
import GMap from "../Map/GMap";
import SearchBar from "../Search/SearchBar";
import { fetchDogs } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

function Home() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchDogs(dispatch);
  }, [])  

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
