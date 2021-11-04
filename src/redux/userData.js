import { createSlice } from "@reduxjs/toolkit";

export const userdataConfig = createSlice({
  name: "userData",
  initialState: {
    location: null,
    cuisine: null,
    cuisineSelect: [],
    locationId: null,
    restaurantsList: [],
    selectedRestaurant: null,
    selectedRestaurantLink: null,
    selectedRestaurantData: null
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload.location;
    },
    setCuisine: (state, action) => {
      state.cuisine = action.payload.cuisine;
      state.locationId = action.payload.id;
    },
    setCuisineSelect: (state, action) => {
      state.cuisineSelect = action.payload.cuisineSelect;
    },
    setRestaurantsList: (state, action) => {
      state.restaurantsList = action.payload;
    },
    setSelectedRestaurant: (state, action) => {
        state.selectedRestaurant = action.payload;
    },
    setSelectedRestaurantLink: (state, action) => {
      state.selectedRestaurantLink = action.payload;
    },
    setSelectedRestaurantData: (state, action) => {
      state.selectedRestaurantData = action.payload
    },
    removeSelected: (state) => {
      state.selectedRestaurant = null;
      state.selectedRestaurantLink = null;
    },
    removeAll: (state) => {
      state.location = null;
      state.cuisine = null;
      state.locationId = null;
      state.cuisineSelect = [];
      state.restaurantsList = [];
      state.selectedRestaurant = null;
      state.selectedRestaurantLink = null;
    },
  },
});

export const {
  setLocation,
  setCuisine,
  setCuisineSelect,
  setRestaurantsList,
  setSelectedRestaurant,
  setSelectedRestaurantLink,
  setSelectedRestaurantData,
  removeSelected,
  removeAll,
} = userdataConfig.actions;

export default userdataConfig.reducer;
