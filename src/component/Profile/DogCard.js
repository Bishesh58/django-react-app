import React, { useEffect, useState } from "react";
import "./DogCard.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import axios from "axios";
import { fetchDogs, fetchEvents } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

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

export default function RecipeReviewCard({ dg }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [dogname, setDogname] = useState(dg?.dogname);
  const [dogcolor, setDogcolor] = useState(dg?.dogcolor);
  const [dogweight, setDogweight] = useState(dg?.dogweight);
  const [dogBreed, setDogBreed] = useState(dg?.dog_breed);
  const dispatch = useDispatch();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    let dog_name = dogname;
    let dog_color = dogcolor;
    let dog_weight = dogweight;
    let dog_breed = dogBreed;
    await axios.put(`https://django-dog-api.herokuapp.com/api/dogs/${dg.id}/`, {
      dog_name,
      dog_color,
      dog_weight,
      dog_breed,
    });
    setExpanded(false);
    fetchDogs(dispatch);
    document.getElementById("profileBtn").addEventListener("click", function(){
      //re-render
    });

  };

  const handleDelete = async (e) => {
   const res = await axios.delete(
      `https://django-dog-api.herokuapp.com/api/dogs/${dg.id}`,
      {
        crossdomain: true,
      }
    );
    if(res.status == 204){
     alert("dog deleted successfully!")
    }
    document.getElementById("profileBtn").addEventListener("click", function(){
      //rerender
    });
  };

  return (
    <div className="dogCard">
      <Card sx={{ maxWidth: 345, margin: 3 }}>
        <CardMedia
          component="img"
          height="194"
          image="https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516345?k=20&m=1213516345&s=612x612&w=0&h=_XUSwcrXe5HjI2QEby0ex6Tl1fB_YJUzUU8o2cUt0YA="
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Dog name: {dg.dog_name} <br />
            Dog weight: {dg.dog_weight} <br />
            Dog color: {dg.dog_color} <br />
            Dog breed: {dg.dog_breed} <br />
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
              <Typography
                variant="body2"
                color="text.secondary"
                component={"div"}
              >
                Dog Name:
              </Typography>
              <TextField
                className="TextField"
                required
                fullWidth
                placeholder={dg?.dog_name}
                onChange={(e) => setDogname(e.target.value)}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                component={"div"}
              >
                Dog Color:
              </Typography>
              <TextField
                className="TextField"
                fullWidth
                placeholder={dg?.dog_color}
                onChange={(e) => setDogcolor(e.target.value)}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                component={"div"}
              >
                Dog Weight:
              </Typography>
              <TextField
                className="TextField"
                fullWidth
                placeholder={dg?.dog_weight}
                onChange={(e) => setDogweight(e.target.value)}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                component={"div"}
              >
                Dog Breed:
              </Typography>
              <TextField
                className="TextField"
                fullWidth
                placeholder={dg?.dog_breed}
                onChange={(e) => setDogBreed(e.target.value)}
              />
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
