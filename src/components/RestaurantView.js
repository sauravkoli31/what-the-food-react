import React, { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import placeholderHeroBanner from "../static/images/placeholder_image1-900x568.jpg";
import { setSelectedRestaurantLink } from "../redux/userData";

function RestaurantView() {
    const userData = useSelector((state) => state.userData);
    let isCuisineVisible = userData?.cuisine?.length > 0;
    let isCuisineSelected = userData?.cuisineSelect?.length > 0;
    let isRandomRestaurant = userData?.selectedRestaurant;
    let topSellingItemPresent =
      userData?.selectedRestaurant?.mostSellingItems?.length > 0;

      const dispatch = useDispatch();
  useEffect(() => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("latitude", userData?.location?.latitude);
    urlencoded.append("longitude", userData?.location?.longitude);
    urlencoded.append("restaurantId", userData?.selectedRestaurant?.id);
    let options = {
      method: "POST",
      body: urlencoded,
    };
    let url = `${process.env.REACT_APP_API_SERVER}/getRestaurantsBranchLink`;
    fetch(url, options)
      .then((data) => data.json())
      .then((data) => {
        dispatch(setSelectedRestaurantLink(data?.response));
      })
      .catch((error) => console.error(error));
  }, [userData?.selectedRestaurant]);
  return (
    <div
      style={{
        width: "50%",
        height: "80%",
        maxHeight: "80%",
        overflow: "-moz-hidden-unscrollable",
      }}
    >
      <Card
        className="curved-edges glassmorph"
        sx={{ margin: "20px", height: "100%" }}
      >
        <div className="foodImages " style={{ position: "relative" }}>
          <CardActionArea
            onClick={() =>
              userData?.selectedRestaurantLink &&
              window.open(userData?.selectedRestaurantLink, "_blank")
            }
          >
            <CardMedia
              component="img"
              image={userData?.selectedRestaurant?.heroImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderHeroBanner;
              }}
              sx={{
                maxHeight: "320px",
              }}
            ></CardMedia>
          </CardActionArea>
        </div>
        <div
          style={{
            background: "rgb(255,255,255)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        >
          <CardContent
            className="mainContent "
            style={{ justifyContent: "flex-start" }}
          >
            <CardMedia
              component="img"
              image={userData?.selectedRestaurant?.logo}
              style={{
                objectFit: "contain",
                maxWidth: "3em",
                transform: `translateY(-75%) translateX(50%) scale(2)`,
                boxShadow: "3px 3px 3px #7f7f7f7f",
                zIndex: 100,
              }}
            />
            <div
              style={{
                flex: "1 1 auto",
                textAlign: "-webkit-left",
                marginLeft: "4em",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                //   marginLeft="3em"
                style={{ fontWeight: 800 }}
              >
                {userData?.selectedRestaurant?.name?.toUpperCase()}
              </Typography>
            </div>
            <Typography component="div" variant="body1" align="left">
              {userData?.selectedRestaurant?.description?.replace(
                /<br \/>/g,
                ""
              )}
            </Typography>
          </CardContent>
        </div>
        {/* 
        Top Selling items.
        */}
        {topSellingItemPresent && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "1em",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              style={{ fontWeight: 800 }}
            >
              {"Top selling items".toUpperCase()}
            </Typography>
            <Divider sx={{ margin: 1, flex: "1 1 auto" }} />
          </div>
        )}
        <div className={"mainContent foodContent"} style={{ margin: "4px" }}>
          {userData?.selectedRestaurant?.mostSellingItems?.map(
            (data, dataKey) => {
              return (
                <Card
                  className="curved-edges foodImages"
                  key={dataKey}
                  sx={{
                    boxShadow: 1,
                    margin: 1,
                    backgroundImage: `url('${data?.image}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    width: "calc(25% - 18px)",
                    height: "200px",
                  }}
                >
                  <CardContent
                    className="mainContent"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      color: "white",
                      width: "-webkit-fill-available",
                    }}
                  >
                    <Typography
                      component="div"
                      variant="button"
                      sx={{
                        lineHeight: 1.2,
                      }}
                    >
                      {data?.name}
                    </Typography>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      </Card>
    </div>
  );
}

export default RestaurantView;
