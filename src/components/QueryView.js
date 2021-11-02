import React from "react";
import { Card } from "@mui/material";
import LocationSelect from "./LocationSelect";
import CuisineSelect from "./CuisineSelect";
import GetRestaurantsButton from "./GetRestaurantsButton";

function QueryView() {
  return (
    <div className="mainDocument">
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
