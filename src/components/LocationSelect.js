import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import CardView from "./CardView";
import locationsPhoto from "../static/images/10891.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setLocation, setCuisine, removeAll } from "../redux/userData";

function LocationSelect() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [geo, setGeo] = useState()

  useEffect(() => {
    dispatch(removeAll());
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitudePos = position.coords.latitude;
      let longitudePos = position.coords.longitude;
      setGeo(`${latitudePos}, ${longitudePos}`)
      dispatch(
        setLocation({
          location: { latitude: latitudePos, longitude: longitudePos },
        })
      );
    });
    return () => {
      dispatch(removeAll());
    };
  }, []);

  const handleClick = (event) => {
    if (userData?.location !== null) {
      let urlencoded = new URLSearchParams();
      urlencoded.append("latitude", userData?.location?.latitude);
      urlencoded.append("longitude", userData?.location?.longitude);
      let options = {
        method: "POST",
        body: urlencoded,
      };
      let url = `${process.env.REACT_APP_API_SERVER}/getCuisines`;
      fetch(url, options)
        .then((data) => data.json())
        .then((data) => {
          dispatch(setCuisine(data?.response));
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <CardView
        title="Location"
        description={`What is your current location.\n${geo ? geo
          : "geolocation not support"}`}
        image={locationsPhoto}
      >
        <Button
          variant="contained"
          className="curved-edges muted-color"
          size="large"
          onClick={handleClick}
          sx={{ m: 1, width: 200, height: 55 }}
        >
          <Typography
            variant="button"
            fontFamily="Barlow, sans-serif"
            color="white"
            fontWeight="800"
          >
            Location
          </Typography>
        </Button>
      </CardView>
    </div>
  );
}

export default LocationSelect;
