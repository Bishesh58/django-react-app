import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./GMap.css";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

const containerStyle = {
  width: "64vw",
  height: "100vh",
};

const center = {
  lat: -36.87246,
  lng: 174.75475,
};
const libraries = ["places"];

function GMap() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [data, setData] = useState({});
  const [address, setAddress] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFItuGWneUe_7082cHZtJ8YxTtR8krmCw",
    libraries,
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  const getAddress = () => {};

  geocodeByAddress(`'${address?.label}'`)
    .then((results) => getLatLng(results[0]))
    .then((results) => {
      const { lat, lng } = results;
      setLat(lat);
      setLng(lng);
    });

  const resetAddress = () => {
    const el = document.querySelector(".css-tt72xr-singleValue");
    if(el){
      el.innerHTML = "";
    }
  };

  return (
    <div className="gMap">
      <GoogleMap
        bootstrapURLKeys={{
          key: "AIzaSyBFItuGWneUe_7082cHZtJ8YxTtR8krmCw",
          language: "en",
          libraries: ["places"],
        }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        <>
          <Marker position={center} />
          <Marker position={{ lat: lat, lng: lng }} />
          <div className="searchAddress">
            <GooglePlacesAutocomplete
              apiKey="AIzaSyBFItuGWneUe_7082cHZtJ8YxTtR8krmCw"
              selectProps={{
                address,
                onChange: setAddress,
                styles: {
                  input: (provided) => ({
                    ...provided,
                    color: "blue",
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "blue",
                  }),
                },
              }}
            />
          </div>
          <button className="btnReset" onClick={resetAddress}>
            clear
          </button>
        </>
      </GoogleMap>
    </div>
  );
}

export default GMap;
