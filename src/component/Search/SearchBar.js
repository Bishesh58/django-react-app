import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import EventCard from "../EventCard/EventCard";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { addNewEvent, fetchEvents } from "../../redux/apiCalls";
import { CircularProgress } from "@mui/material";
import Moment from "moment";

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
          <Typography component={"div"}>{children}</Typography>
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

function SearchBar(props) {
  const dispatch = useDispatch();
  const { isLoading, newEventDetails, eventsDetails } = useSelector(
    (state) => state.events
  );

  const token = localStorage.getItem("token");

  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [publishedDate, setPublishedDate] = useState(new Date());
  const [address, setAddress] = useState(null);

  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");

  useEffect(() => {
    fetchEvents(dispatch);
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchText, setsearchText] = useState("");
  const [data, setData] = useState([]);

  const handleSearchText = (value) => {
    setsearchText(value);
    filterData(value);
  };

  const filterData = async (value) => {
    const inputText = value.toLowerCase().trim();

    if (!inputText) {
        //
    } else {
      const resData = eventsDetails;
      const filterData = resData.filter((item) => {
        return (
          item.address?.toLowerCase().toString().includes(inputText) ||
          item.title?.toLowerCase().toString().includes(inputText) ||
          item.username?.toLowerCase().toString().includes(inputText) ||
          item.body?.toLowerCase().toString().includes(inputText) ||
          item.publishedDate?.toString().includes(inputText) ||
          item.startDate?.toLowerCase().toString().includes(inputText) ||
          item.endDate?.toLowerCase().toString().includes(inputText)
        );
      });

      setData(filterData);
    }
  };
  const handleFilterSearch = async (e) => {
    e.preventDefault();
    
  };

  const handleReset = (e) => {
    e.preventDefault();
    setData([]);
  };

  const resetField = () => {
    const el = document.querySelector(".css-tt72xr-singleValue");
    if (el) {
      el.innerHTML = "";
    }
  };

  const handleNewEventSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleErrorMessage("Please enter this field");
    } else if (address === "") {
      return;
    } else {
      const payload = {
        title,
        body,
        creator: username,
        address: address.label,
        start_date: Moment(`"${startDate}"`).format("YYYY-MM-DD"),
        end_date: Moment(`"${endDate}"`).format("YYYY-MM-DD"),
        post_date: Moment(`"${publishedDate}"`).format("YYYY-MM-DD"),
      };
      console.log(payload);
      addNewEvent(payload, dispatch);
    }
  };

  return (
    <div className="searchBar">
      <div className="search-top">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Search Event" {...a11yProps(0)} />
              <Tab label="Add Event" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} className="tabPanel">
            <form noValidate autoComplete="off">
              <div>               
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <TextField
                    id="outlined-basic"
                    label="Enter here to search.."
                    variant="standard"
                    size="small"
                    type="search"
                    value={searchText}
                    onChange={(e) => handleSearchText(e.target.value)}
                  />
                </FormControl>
              </div>
              <div>
                <Button
                  size="large"
                  variant="outlined"
                  className="searchButton"
                  onClick={handleFilterSearch}
                  type="submit"
                >
                  Search
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  className="searchButton"
                  onClick={handleReset}
                  type="reset"
                >
                  Reset
                </Button>
              </div>
            </form>
            <div className="events-data">
              {data?.map((ev, i) => (
                <EventCard ev={ev} key={i} />
              ))}
              {data?.length === 0 && (
                <span style={{ paddingLeft: "15px" }}>
                  No records found to be displayed..
                </span>
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="search-new-event">
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleNewEventSubmit}
              >
                <div className="register-input">
                  <TextField
                    className="TextField"
                    error={titleError}
                    helperText={titleErrorMessage}
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    onFocus={() => (
                      setTitleError(false), setTitleErrorMessage("")
                    )}
                  />
                  <TextField
                    className="TextField"
                    label="creator"
                    defaultValue={username}
                    disabled
                    fullWidth
                    variant="outlined"
                  />
                  <TextareaAutosize
                    maxRows={4}
                    minRows={4}
                    value={body}
                    required
                    onChange={(e) => setBody(e.target.value)}
                    aria-label="body"
                    placeholder="Write your event activities/details here:"
                    style={{ width: "100%" }}
                  />
                  <div className="geocoding">
                    <span
                      id="lblAddress"
                      style={{ color: "grey", fontSize: "16px" }}
                    >
                      Address:
                    </span>
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyBFItuGWneUe_7082cHZtJ8YxTtR8krmCw"
                      selectProps={{
                        address,
                        onChange: setAddress,
                        styles: {
                          input: (provided) => ({
                            ...provided,
                            color: "black",
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
                    <Button className="clearAddress" onClick={resetField}>
                      clear
                    </Button>
                  </div>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="date">
                      <DatePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Date"
                        value={startDate}
                        fullWidth
                        onChange={(newValue) => {
                          setStartDate(
                            Moment(`"${newValue}"`).format("YYYY-MM-DD")
                          );
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    <div className="date">
                      <DatePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date"
                        value={endDate}
                        fullWidth
                        onChange={(newValue) => {
                          setEndDate(
                            Moment(`"${newValue}"`).format("YYYY-MM-DD")
                          );
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    <div className="date">
                      <DatePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="published date"
                        value={publishedDate}
                        readOnly
                        fullWidth
                        onChange={(newValue) => {
                          setPublishedDate(
                            Moment(`"${newValue}"`).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </div>
                  </LocalizationProvider>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                  style={{ marginLeft: "10px" }}
                >
                  {isLoading ? (
                    <CircularProgress
                      size="30px"
                      style={{ marginLeft: "10px" }}
                      color="inherit"
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
                {newEventDetails ? (
                  <span style={{ marginLeft: "5px", color: "green" }}>
                    You have added event successfully
                  </span>
                ) : null}
              </form>
            </div>
          </TabPanel>
        </Box>
      </div>
      <div className="search-bottom">
        {/*  */}
      </div>
    </div>
  );
}

export default SearchBar;
