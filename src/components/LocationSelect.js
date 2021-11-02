import React, { useEffect, useState, useCallback } from "react";
import { Button, Typography } from "@mui/material";
import CardView from "./CardView";
import { useSelector, useDispatch } from "react-redux";
import { setLocation, setCuisine, removeAll } from "../redux/userData";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./LocationMarker";

const center = [24.2299122, 54.8346532];
const zoom = 7;

function CenterPosition({ map }) {
  const dispatch = useDispatch();

  const onMove = useCallback(() => {
    dispatch(
      setLocation({
        location: map.getCenter(),
      })
    );
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);
  return null;
}

function LocationSelect() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);

  useEffect(() => {
    dispatch(removeAll());
    return () => {
      dispatch(removeAll());
    };
  }, []);

  const handleClick = (event) => {
    if (userData?.location !== null) {
      let urlencoded = new URLSearchParams();
      urlencoded.append("latitude", userData?.location?.lat);
      urlencoded.append("longitude", userData?.location?.lng);
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
    } else {
      window.alert("Please select a location in the map. Alternatively you can click on the map and allow the permission to get your location.")
    }
    
  };

  return (
    <div>
      <CardView
        title="Location"
        description="Select a location. Alternatively, you can just click on the map to allow the application to access your current locaiton."
        backgroundColor="rgb(255,255,255,0.75)"
      >
        <div style={{ width: "-webkit-fill-available" }}>
          <div style={{ width: "100%", height: "100%" }}>
            <MapContainer
              style={{ width: "100%", height: "300px" }}
              center={center}
              zoom={zoom}
              scrollWheelZoom={true}
              whenCreated={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={process.env.REACT_APP_MAP_BOX}
              />
              {map ? <CenterPosition map={map} /> : null}
              <LocationMarker />
            </MapContainer>
          </div>
          <Button
            variant="contained"
            className="muted-color"
            size="large"
            onClick={handleClick}
            sx={{ m: 1, width: 200, borderRadius: "6px" }}
          >
            <Typography
              variant="button"
              color="white"
              fontWeight="800"
            >
              set location
            </Typography>
          </Button>
        </div>
      </CardView>
    </div>
  );
}

export default LocationSelect;
