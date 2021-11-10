import React, { useState, useEffect } from "react";
import "./Map.css";
import ReactMapGL, { Marker, Popup, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

function Map() {
  const [address, setAddress] = useState(" ");
  const [currentPlaceID, setCurrentPlaceID] = useState(null);
  const [newEvent, setNewEvent] = useState(null);
  const [title, setTitle] = useState(" ");
  const [activities, setActivities] = useState("");
  const [dogtype, setDogType] = useState("");
  const [dogweight, setDogweight] = useState();
  const [activityList, setActivityList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [join, setJoin] = useState(false);
  const [points, setPoint] = useState([]);
  const [steps, setSteps] = useState([]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: -36.848461,
    longitude: 174.763336,
    zoom: 13,
  });

  const [settings, setSettings] = useState({
    doubleClickZoom: false,
  });

  //get events
  useEffect(() => {}, []);

  const handleMarkerClick = (e) => {};

  //adding activity list
  const addActivities = (e) => {
    e.preventDefault();
    setActivityList((activityList) => [...activityList, activities]);
    setActivities(" ");
  };

  //removing item from activity list
  const removeList = (e) => {
    const index = e.currentTarget.dataset.index;
    var array = [...activityList];
    if (index !== -1) {
      array.splice(index, 1);
      setActivityList(array);
    }
  };

  const handleSubmitNewEvent = async (e) => {
    e.preventDefault();

    // try {
    //   await fetch(
    //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${newEvent.long},${newEvent.lat}.json?access_token=${process.env.REACT_APP_MAPBOX}`
    //   )
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       setAddress(data.features[0].place_name);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // const payload = {
    //   username: userDetails.username,
    //   profilepic: userDetails.profilepic,
    //   title,
    //   dogtype,
    //   dogweight,
    //   startDate,
    //   endDate,
    //   activities: activityList,
    //   lat: newEvent.lat,
    //   long: newEvent.long,
    //   address,
    // };
    // addNewEvent(payload, dispatch);
    // setNewEvent(null);
    // setActivityList([]);
  };

  const addToGoing = async (ev) => {};

  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: points,
    },
  };
  const layer = {
    id: "points",
    type: "line",
    source: {
      type: "geojson",
      data: geojson,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#3887be",
      "line-width": 5,
      "line-opacity": 0.75,
    },
  };

  const getRoutes = async (lat, long) => {
    // const res =
    //   await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/
    // ${userDetails.long},${userDetails.lat};${long},${lat}
    // ?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYmlzaGVzaHN1bmFtIiwiYSI6ImNrcm40Z3g1bjgwbTYyb3BhaTYzazRkaHMifQ.sKBOMc0QI4adcKRF3KN7-w`);
    // setPoint(res.data.routes[0].geometry.coordinates);
    // //console.log(res.data.routes[0])
    // setSteps(res.data.routes[0].legs[0].steps);
    // const instructions = document.getElementById("instructions");
    // let tripInstructions = "";
    // for (const step of steps) {
    //   tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    // }
    // instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
    //   res.data.routes[0].duration / 60
    // )} min 🚗  ${Math.floor(
    //   res.data.routes[0].distance / 1000
    // )} km</strong></p><div class="instructions_list "><ol>${tripInstructions}</ol></div>`;
  };

  return (
    <div className="mapbox">
      <ReactMapGL
        {...viewport}
        {...settings}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/bisheshsunam/ckvtidp8u1t2m14ldxhu8hakh"
      >
        {/* {userDetails && (
          <Marker
            latitude={userDetails?.lat}
            longitude={userDetails?.long}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <div>
              Home<HomeIcon></HomeIcon>
            </div>
          </Marker>
        )} */}

        {/* {eventsDetails?.map((ev, i) => (
          <>
            <Marker
              latitude={ev.lat}
              longitude={ev.long}
              offsetLeft={-viewport.zoom * 1.5}
              offsetTop={-viewport.zoom * 3}
              key={i}
            >
              <div>
                <RoomIcon
                  style={{
                    fontSize: viewport.zoom * 3,
                    color: ev.username === "Bishesh" ? "#c56cf0" : "tomato",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(ev)}
                ></RoomIcon>
              </div>
            </Marker>

            {ev._id === currentPlaceID && (
              <Popup
                latitude={ev.lat}
                longitude={ev.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceID(null)}
                anchor="top"
                className="popup"
              >
                <Source type="geojson" data={geojson}>
                  <Layer {...layer} />
                </Source>

                <div key={i} className="mapbox__eventCard">
                  <div className="dogName">
                    <Avatar src={ev?.profilepic} />
                    <p style={{ marginLeft: "10px" }}>{ev?.username}</p>
                  </div>
                  <p>{ev?.title}</p>
                  {ev?.activities.map((el, index) => {
                    return (
                      <li style={{ padding: "5px 0px" }} key={index}>
                        {el}
                      </li>
                    );
                  })}
                  <p>Dog breed: {ev?.dogtype}</p>
                  <p>Dog weight: {ev?.dogweight} kg</p>
                  <p>
                    Start: {moment(ev.startDate).format("MMMM Do YYYY, h:mm a")}
                  </p>
                  <p>
                    End: {moment(ev.endDate).format("MMMM Do YYYY, h:mm a")}
                  </p>
                  <p>{ev.address}</p>
                  <span>created: {format(ev.createdAt)}</span>
                  <p>
                    <Button
                      style={
                        join
                          ? {
                              backgroundColor: "green",
                              color: "#FFFFFF",
                              textTransform: "capitalize",
                            }
                          : {
                              backgroundColor: "#5577d2",
                              color: "#FFFFFF",
                              textTransform: "capitalize",
                            }
                      }
                      onClick={() => addToGoing(ev)}
                    >
                      {join ? "Joined" : "Join"}
                    </Button>{" "}
                    {going}
                  </p>
                </div>
              </Popup>
            )}
          </>
        ))} */}

        {/* {newEvent && (
          <Popup
            latitude={newEvent.lat}
            longitude={newEvent.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewEvent(null)}
            anchor="bottom"
          >
            Add New Event
            <div className="newEvent">
              <form onSubmit={handleSubmitNewEvent}>
                <TextField
                  className="TextField"
                  fullWidth
                  label="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  type="text"
                  variant="outlined"
                />
                <TextField
                  className="TextField"
                  fullWidth
                  label="Dog Breed"
                  onChange={(e) => setDogType(e.target.value)}
                  required
                  type="text"
                  variant="outlined"
                />
                <TextField
                  className="TextField"
                  fullWidth
                  label="Dog Weight"
                  onChange={(e) => setDogweight(e.target.value)}
                  required
                  type="text"
                  variant="outlined"
                />
                <TextField
                  className="TextField"
                  label="Activities"
                  variant="outlined"
                  required
                  value={activities}
                  fullWidth
                  onChange={(e) => setActivities(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          onClick={addActivities}
                          disabled={!activities.trim()}
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="activityList">
                  {activityList.map((activity, index) => (
                    <div key={index}>
                      {activity}
                      <IconButton data-index={index} onClick={removeList}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  ))}
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="DatePicker">
                    <DateTimePicker
                      label="Start Date"
                      inputVariant="outlined"
                      // minDateTime={}
                      value={startDate}
                      onChange={setStartDate}
                      fullWidth
                      style={{ paddingRight: "10px" }}
                    />

                    <DateTimePicker
                      label="End Date"
                      inputVariant="outlined"
                      // minDateTime={}
                      value={endDate}
                      onChange={setEndDate}
                      fullWidth
                    />
                  </div>
                </MuiPickersUtilsProvider>

                <Button type="submit">Submit</Button>
              </form>
            </div>
          </Popup>
        )} */}
        {/* {currentPlaceID && <div id="instructions"></div>} */}
      </ReactMapGL>
    </div>
  );
}

export default Map;
