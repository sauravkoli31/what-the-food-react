import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import placeholderHeroBanner from "../static/images/placeholder_image1-900x568.jpg";
import CardView from "./CardView";
import LocationSelect from "./LocationSelect";
import CuisineSelect from "./CuisineSelect";
import GetRestaurantsButton from "./GetRestaurantsButton";

function QueryView() {
  return (
    <div style={{ width: "50%", height: "80%", maxHeight: "80%" }}>
      <Card
        className="curved-edges glassmorph"
        sx={{ margin: "20px", height: "100%" }}
      >
        <LocationSelect/>
        <CuisineSelect/>
        <GetRestaurantsButton/>
      </Card>
    </div>
  );
}

export default QueryView;
