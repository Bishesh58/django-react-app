import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "64vw",
  height: "100vh",
};

const center = {
  lat: -36.87246,
  lng: 174.75475,
};

function GMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFItuGWneUe_7082cHZtJ8YxTtR8krmCw",
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="gMap">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
}

export default GMap;
