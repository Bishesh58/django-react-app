import React from "react";
import "./EventCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function EventCard({ev}) {
  return (
    <div className="eventCard">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography component={"div"}>{ev.title}</Typography>
          <hr/>
          <br/>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            {ev.body}
          </Typography>

          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            Start Date: {ev.start_date}
          </Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            End Date: {ev.end_date}
          </Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            Address: {ev.address}
          </Typography>
          
          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            created at: {ev.post_date}
          </Typography>

          <Typography
            component={"div"}
            sx={{ fontSize: 16 }}
            color="textSecondary"
          >
            Total people join: {ev.join}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default EventCard;
