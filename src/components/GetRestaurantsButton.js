import React from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setRestaurantsList,
  setSelectedRestaurant,
  removeSelected,
} from "../redux/userData";
import Typography from "@mui/material/Typography";

function GetRestaurantsButton() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  let isCuisineSelected = userData?.cuisineSelect?.length > 0;

  const handleChange = () => {
    dispatch(removeSelected());
    if (!isCuisineSelected) {
      window.alert(
        "Please select the cuisines. If the cuisines list is empty, try clicking the location button again."
      );
    }
    if (isCuisineSelected) {
      let haveRestaurantList = userData.restaurantsList.length > 0;
      if (!haveRestaurantList) {
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
            selectRandomRestaurant(data.response);
          });
      }
      if (haveRestaurantList) {
        selectRandomRestaurant(userData.restaurantsList);
      }
    }
  };

  const random_item = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const selectRandomRestaurant = (array) => {
    if (array.length > 0) {
      let restaurantsIds = array;
      let selectedRestaurant = random_item(restaurantsIds);
      let urlencoded = new URLSearchParams();
      urlencoded.append("id", selectedRestaurant);
      let options = {
        method: "POST",
        body: urlencoded,
      };
      let url = `${process.env.REACT_APP_API_SERVER}/getRestaurantsById`;
      fetch(url, options)
        .then((data) => data.json())
        .then((data) => {
          dispatch(setSelectedRestaurant(data?.response));
        });
    }
  };

  return (
    <Button
      sx={{ m: "24px", width: "auto" }}
      variant="contained"
      className="muted-color-1"
      size="large"
      disabled={!userData?.cuisineSelect?.length > 0}
      onClick={handleChange}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="button"
          noWrap
          component="div"
          color="white"
          fontWeight="800"
        >
          Search
        </Typography>
        {/* <img src={`${searchButtonImage}`} alt="Bhook toh lagi hai. dabba ke dekh." loading="lazy" height={150} /> */}
      </div>
    </Button>
  );
}

export default GetRestaurantsButton;
