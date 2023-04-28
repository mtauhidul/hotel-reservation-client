import React from "react";
import styles from "./Location.module.scss";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Location = () => {
  return (
    <div className={styles._wrapper}>
      <Box className={styles._location_header}>
        <LocationOnIcon />
        <Typography variant="h6" color="inherit">
          Localisation
        </Typography>
      </Box>
      <Box className={styles._location}>
        {/* <iframe
          src="https://www.google.com/maps/d/embed?mid=1bqm79ll2ChiHMUPHevsjoC4MRco&hl=en&ehbc=2E312F"
          width="100%"
          height="100%"
        ></iframe> */}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.881967092916!2d0.704333177034073!3d48.82231347132734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e179d91c81c419%3A0x3d94cc8691023466!2sLe%20Clos%20Saint-Germain!5e0!3m2!1sen!2sbd!4v1682193076948!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          //   allowfullscreen=""
          loading="lazy"
          //   referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </div>
  );
};

export default Location;
