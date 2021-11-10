import React, { useState } from "react";
import "./Profile.css";
import ProfileCard from "./ProfileCard";
import DogCard from "./DogCard";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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

function Profile() {
  const [value, setValue] = useState(0);

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
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="profile-panel">
            <ProfileCard />
            <Button>Delete Profile</Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="dog-panel">
            <div className="dog-list">
              <DogCard />
              <DogCard />
              <DogCard />
              <DogCard />
              <DogCard />
              <DogCard />
              <DogCard />
              <DogCard />
              <DogCard />
            </div>
            <div className="dog-add">
              <Button style={{ backgroundColor: "teal", color: "white" }}>
                Add New Dog
              </Button>
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}

export default Profile;
