import React, { useEffect } from "react";
import { Button } from "@mui/material";
import searchButtonImage from "../static/images/searchButton.png";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurantsList, setSelectedRestaurant, removeAll } from "../redux/userData";
import Typography from '@mui/material/Typography';

function GetRestaurantsButton() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const handleChange = () => {
      if (!!userData.restaurantsList){
          let urlencoded = new URLSearchParams();
          urlencoded.append("id", userData?.locationId);
          urlencoded.append("chosenCuisines", userData?.cuisineSelect);
          let options = {
            method: "POST",
            body: urlencoded,
          };
          let url = `${process.env.REACT_APP_API_SERVER}/getRestaurants`;
          fetch(url, options)
            .then((data) => data.json())
            .then((data) => {
              dispatch(setRestaurantsList(data.response));
              selectRandomRestaurant(data.response)
            });
      }
      selectRandomRestaurant(userData.restaurantsList)
  };

  const random_item = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const selectRandomRestaurant = (array) => {
    if (array.length > 0) {
      let restaurantsIds = array.map((data) => data.id);
      let selectedRestaurant = random_item(restaurantsIds)
      dispatch(setSelectedRestaurant(array.find(
        place => place.id === selectedRestaurant
      )))
    }
  };

  return (
    <Button
      sx={{ m: 1, width: 150}}
      variant="contained"
      className="buttonStyle muted-color-1"
      size="large"
      onClick={handleChange}
    >
      <div style={{display:"flex", flexDirection:"column"}}>
      <Typography variant="button" noWrap component="div" fontFamily= "Barlow, sans-serif" color="white" fontWeight="800" marginTop="1.7vh">
          Search
          </Typography>
      <img src={`${searchButtonImage}`} loading="lazy" height={150} />
      </div>
    </Button>
  );
}

export default GetRestaurantsButton;
