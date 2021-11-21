import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import ProfileCard from "./ProfileCard";
import DogCard from "./DogCard";
import EventHistoryCard from "../EventHistoryCard/EventHistoryCard";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { fetchDogs, addNewDog } from "../../redux/apiCalls";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function Profile() {
  let { dogsDetail } = useSelector((state) => state.dogs);
  const { eventsDetails } = useSelector((state) => state.events);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    fetchDogs(dispatch);
  }, [dogsDetail]);

  const navigate = useNavigate();

  const userid = localStorage.getItem("userid");
  const [value, setValue] = useState(0);
  const [dogname, setDogname] = useState("");
  const [dogcolor, setDogcolor] = useState("");
  const [dogbreed, setDogbreed] = useState("");
  const [dogweight, setDogweight] = useState();

  const [dogWeightError, setDogWeightError] = useState(false);
  const [dogWeightErrorMessage, setDogWeightErrorMessage] = useState("");
  const [dogNameError, setDogNameError] = useState(false);
  const [dogNameErrorMessage, setDogNameErrorMessage] = useState("");

  const dispatch = useDispatch();
  const ownerId = localStorage.getItem("userid");
  let dogs = JSON.parse(localStorage["dogs"]);

  //pop up add dog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //pop up delete profile
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //delete handle
  const handleSubmitDelete = async () => {
    const res = await axios.delete(
      `https://django-dog-api.herokuapp.com/api/user/${userid}/`,
      {
        data: { password, username },
      }
    );
    alert("Your account has been deleted! Sorry to let you go..");
    navigate("/login");
  };

  //add new dog handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dogname === "") {
      setDogNameError(true);
      setDogNameErrorMessage("Please fill in this field.");
    } else if (dogweight > 120 || dogweight < 5) {
      setDogWeightError(true);
      setDogWeightErrorMessage("Dog weight must be betweent 5 to 130 kg");
    } else {
      const payload = {
        dog_name: dogname,
        dog_weight: dogweight,
        dog_color: dogcolor,
        owner: localStorage.getItem("username"),
        date_added: "2021-11-17",
        dog_pic: "null",
      };
      addNewDog(payload, dispatch);
      fetchDogs(dispatch);
      setOpen(false);
      forceUpdate();
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="profile">
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="profile"
          >
            <Tab label="My Profile" {...a11yProps(0)} />
            <Tab label="My Dog" {...a11yProps(1)} />
            <Tab label="My Events History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="profile-panel">
            <ProfileCard />
            <Button onClick={handleClickOpenDelete}>Delete Profile</Button>
          </div>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>
              Deleting Profile can not be undone. Are you sure you want to
              delete?
            </DialogTitle>
            <DialogContent>
              <TextField
                className="TextField"
                fullWidth
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                variant="standard"
              />
              <TextField
                className="TextField"
                fullWidth
                required
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancel </Button>
              <Button type="submit" onClick={handleSubmitDelete}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="dog-panel">
            <div className="dog-list">
              {dogs
                .filter((item) => item.owner == ownerId)
                .map((dg, i) => (
                  <DogCard dg={dg} key={i} />
                ))}
            </div>
            <div className="dog-add">
              <form>
                <Button
                  onClick={handleClickOpen}
                  style={{ backgroundColor: "teal", color: "white" }}
                >
                  Add New Dog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Add New Dog</DialogTitle>
                  <DialogContent>
                    <TextField
                      className="TextField"
                      error={dogNameError}
                      helperText={dogNameErrorMessage}
                      fullWidth
                      label="Dog name"
                      onChange={(e) => setDogname(e.target.value)}
                      required
                      type="text"
                      variant="outlined"
                      onFocus={() => (
                        setDogNameError(false), setDogNameErrorMessage("")
                      )}
                    />
                    <TextField
                      className="TextField"
                      fullWidth
                      required
                      label="Dog color"
                      onChange={(e) => setDogcolor(e.target.value)}
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      className="TextField"
                      fullWidth
                      label="Dog breed"
                      onChange={(e) => setDogbreed(e.target.value)}
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      className="TextField"
                      error={dogWeightError}
                      helperText={dogWeightErrorMessage}
                      fullWidth
                      label="Dog Weight (kg)"
                      onChange={(e) => setDogweight(e.target.value)}
                      type="text"
                      variant="outlined"
                      onFocus={() => (
                        setDogWeightError(false), setDogWeightErrorMessage("")
                      )}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="event-panel">
            <div className="eventHistory-list">
              {eventsDetails
                .filter((item) => item.creator == ownerId)
                .map((ev, i) => (
                  <EventHistoryCard ev={ev} key={i} />
                ))}
            </div>
          </div>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>
              Deleting Profile can not be undone. Are you sure you want to
              delete?
            </DialogTitle>
            <DialogContent>
              <TextField
                className="TextField"
                fullWidth
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                variant="standard"
              />
              <TextField
                className="TextField"
                fullWidth
                required
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancel </Button>
              <Button type="submit" onClick={handleSubmitDelete}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>
      </Box>
    </div>
  );
}

export default Profile;
