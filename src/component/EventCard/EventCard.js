import React from "react";
import "./EventCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function EventCard() {
  return (
    <div className="eventCard">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography component={"div"}>Title: title1</Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            body: bla bla Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sequi deserunt distinctio reiciendis architecto debitis! Nisi,
            eaque. Voluptates aliquam sapiente ullam porro, fuga ipsam, sit
            cupiditate autem perferendis vel iste fugiat.
          </Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            address: bla bla
          </Typography>

          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            Start Date: date
          </Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            End Date: date
          </Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            Address: address
          </Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            creator: bishesh
          </Typography>

          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            Total people join: join
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default EventCard;
