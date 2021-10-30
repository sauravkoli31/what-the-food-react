import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSelectedRestaurantLink } from "../redux/userData";


function SelectedRestaurant(props) {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    let urlencoded = new URLSearchParams()
    urlencoded.append("latitude", userData?.location?.latitude)
    urlencoded.append("longitude", userData?.location?.longitude)
    urlencoded.append("restaurantId", userData?.selectedRestaurant?.id)
    let options = {
      method: "POST",
      body: urlencoded,
    }
    let url = `${process.env.REACT_APP_API_SERVER}/getRestaurantsBranchLink`;
    fetch(url, options)
      .then((data) => data.json())
      .then((data) => {
        dispatch(setSelectedRestaurantLink(data?.response))
      })
      .catch((error) => console.error(error))

  }, [userData?.selectedRestaurant])

  return (
    <div>
      <Card sx={{ maxWidth: 600 }} className="curved-edges">
        <CardActionArea onClick={() => userData?.selectedRestaurantLink && window.open(userData?.selectedRestaurantLink, "_blank")}>
          <CardMedia
            component="img"
            height="180"
            sx={{ maxWidth: 600 }}
            image={props.image}
            alt={props.title}
          />
          <CardContent
            className="mainContent"
            style={{ justifyContent: "flex-start" }}
          >
            <CardMedia
              component="img"
              image={props.logo}
              style={{
                objectFit: "contain",
                maxWidth: "35px",
                transform: `translateY(-75%) translateX(50%) scaleX(2) scaleY(2)`,
                boxShadow: "3px 3px 3px #7f7f7f7f",
              }}
              alt={props.title}
            />
            <Typography variant="h5" component="div" marginLeft="3em">
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default SelectedRestaurant;
