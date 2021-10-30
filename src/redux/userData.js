import { createSlice } from "@reduxjs/toolkit";

// const storeItem = "tummy";

// const initialState = localStorage.getItem(storeItem)
//   ? JSON.parse(localStorage.getItem(storeItem))
//   : null;

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
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload.location;
    //   localStorage.setItem(storeItem, JSON.stringify(state));
    },
    setCuisine: (state, action) => {
      state.cuisine = action.payload.cuisine;
      state.locationId = action.payload.id;
    //   localStorage.setItem(storeItem, JSON.stringify(state));
    },
    setCuisineSelect: (state, action) => {
      state.cuisineSelect = action.payload.cuisineSelect;
    //   localStorage.setItem(storeItem, JSON.stringify(state));
    },
    setRestaurantsList: (state, action) => {
      state.restaurantsList = action.payload;
    //   localStorage.setItem(storeItem, JSON.stringify(state));
    },
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    //   localStorage.setItem(storeItem, JSON.stringify(state));
    },
    setSelectedRestaurantLink: (state, action) => {
      state.selectedRestaurantLink = action.payload;
    //   localStorage.setItem(storeItem, JSON.stringify(state));
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
    //   localStorage.removeItem(storeItem);
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
  removeSelected,
  removeAll,
} = userdataConfig.actions;

export default userdataConfig.reducer;
