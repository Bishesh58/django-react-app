import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import axios from "axios";

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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const { authToken } = useSelector((state) => state.auth);
  const userid = localStorage.getItem("userid");

  const [username, setUsername] = useState(
    authToken?.username || localStorage.getItem("username")
  );

  const [firstName, setFirstName] = useState(
    authToken?.first_name || localStorage.getItem("firstname")
  );
  const [lastName, setLastName] = useState(
    authToken?.last_name || localStorage.getItem("lastname")
  );
  const [email, setEmail] = useState(
    authToken?.email || localStorage.getItem("email")
  );
  const [password, setPassword] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    let first_name = firstName;
    let last_name = lastName;
    await axios.put(
      `https://django-dog-api.herokuapp.com/api/user/${userid}/`,
      { password, username, first_name, last_name, email }
    );
    setExpanded(false);
  };

  return (
    <Card sx={{ maxWidth: 400, minWidth: 400, margin: 3 }}>
      <CardMedia
        component="img"
        height="300"
        image="https://cdn.pixabay.com/photo/2018/08/04/10/23/man-3583424_1280.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          Username: {username}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          First Name: {firstName}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          Last Name: {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          email: {email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
              Username:
            </Typography>
            <TextField
              className="TextField"
              required
              fullWidth
              placeholder={username}
              inputProps={{ readOnly: true }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography variant="body2" color="text.secondary">
              First Name:
            </Typography>
            <TextField
              className="TextField"
              fullWidth
              placeholder={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Typography variant="body2" color="text.secondary">
              Last Name:
            </Typography>
            <TextField
              className="TextField"
              fullWidth
              placeholder={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Typography variant="body2" color="text.secondary">
              email:
            </Typography>
            <TextField
              className="TextField"
              fullWidth
              placeholder={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="body2" color="text.secondary">
              Password:
            </Typography>
            <TextField
              className="TextField"
              fullWidth
              type="password"
              placeholder="password is required to update profile"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth onClick={handleUpdateSubmit}>
              Update
            </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}
