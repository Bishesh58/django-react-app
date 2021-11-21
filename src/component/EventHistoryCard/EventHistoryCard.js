import React, { useEffect, useState } from "react";
import "./EventHistoryCard.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { fetchDogs } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ ev }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [address, setAddress] = useState("");
  const [post_date, setPost_date] = useState("");
  const [state_date, setStart_date] = useState(ev?.start_date);
  const [end_date, setEnd_date] = useState(ev?.end_date);
  const [join, setJoin] = useState([]);

  const dispatch = useDispatch();

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    // axios.put(`https://django-dog-api.herokuapp.com/api/events/${ev.id}/`, {
    //   title,
    //   body,
    //   start_date,
    //   end_date,
    //   address,
    // });
    setExpanded(false);
  };

  const handleDelete = async (e) => {
    // await axios.delete(
    //   `https://django-dog-api.herokuapp.com/api/events/${ev.id}`,
    //   {
    //     crossdomain: true,
    //   }
    // );
  };

  const resetField = () => {
    const el = document.querySelector(".css-tt72xr-singleValue");
    if (el) {
      el.innerHTML = "";
    }
  };
  return (
    <div className="eventHistoryCard">
      <Card sx={{ maxWidth: 480, minWidth: 300, margin: 3 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Title: {ev.title} <br /> <hr />
            Body: {ev.body} <br />
            Address: {ev.address} <br />
            Start Date: {ev.start_date} <br />
            End Date: {ev.end_date} <br />
            Post Date: {ev.post_date} <br />
            Created by: you <br />
            Join: {ev.join} <br />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button type="submit" onClick={handleDelete}>
            Delete
          </Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <form>
              <Typography variant="body2" color="text.secondary">
                Title:
              </Typography>
              <TextField
                className="TextField"
                required
                fullWidth
                placeholder={ev.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Typography variant="body2" color="text.secondary">
                Body:
              </Typography>
              <TextareaAutosize
                maxRows={4}
                minRows={4}
                value={body}
                required
                onChange={(e) => setBody(e.target.value)}
                aria-label="body"
                placeholder={ev.body}
                style={{ width: "100%" }}
              />
              <Typography variant="body2" color="text.secondary">
                Address: {ev.address}
              </Typography>
              <div className="geocoding">
                <span
                  id="lblAddress"
                  style={{ color: "grey", fontSize: "16px" }}
                >
                  Change address:
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
                <div className="dateContainer">
                  <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start date"
                    value={state_date}
                    onChange={(newValue) => {
                      setStart_date(
                        Moment(`"${newValue}"`).format("YYYY-MM-DD")
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="dateContainer">
                  <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End date"
                    value={end_date}
                    onChange={(newValue) => {
                      setEnd_date(Moment(`"${newValue}"`).format("YYYY-MM-DD"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="dateContainer">
                  <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="created date"
                    value={ev.post_date}
                    readOnly
                  />
                </div>
              </LocalizationProvider>
              <Button type="submit" fullWidth onClick={handleUpdateSubmit}>
                Update
              </Button>
            </form>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
