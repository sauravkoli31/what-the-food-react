import React, { useEffect, useRef } from "react";
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
import {
  setSelectedRestaurantLink,
  setSelectedRestaurantData,
} from "../redux/userData";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const colorCodes = {
  open: "rgb(0,187,0)",
  closed: "rgb(255, 68, 0)",
  busy: "rgb(255, 166, 0)",
  rating: "rgb(255, 166, 0)",
  accessTime: "#ff7f50",
};

function ColorCards(props) {
  return (
    <Card
      sx={{
        padding: "0.5rem",
        marginLeft: "0.5rem",
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: colorCodes[props.color] || "#f3aa80",
      }}
      className={props.hideOnPhone && "hideOnXs"}
    >
      {props.children}
      <Typography
        variant="button"
        sx={{
          color: "white",
        }}
      >
        {props.text}
      </Typography>
    </Card>
  );
}

function MiniInfoCards(props) {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "0.5rem",
        margin: "0.3rem",
        width: "fit-content",
        backgroundColor: "#8d8d8d",
      }}
    >
      <Typography
        // variant="subtitle2"
        sx={{
          // fontWeight: 800,
          color: "white",
          fontSize: "0.675em",
          // letterSpacing: "0.2em",
        }}
      >
        {props?.title.toUpperCase()} : {props?.value}
      </Typography>
    </Card>
  );
}

function RestaurantView() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  let topSellingItemPresent =
    userData?.selectedRestaurant?.mostSellingItems?.length > 0;

  useEffect(() => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("latitude", userData?.location?.lat);
    urlencoded.append("longitude", userData?.location?.lng);
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

  useEffect(() => {
    dispatch(setSelectedRestaurantData(null));
    if (userData?.selectedRestaurantLink) {
      let mostSellingItems = userData?.selectedRestaurant?.mostSellingItems.map(
        (item) => item.id
      );
      let urlencoded = new URLSearchParams();
      urlencoded.append("url", userData?.selectedRestaurantLink);
      urlencoded.append("mSI", mostSellingItems);
      let options = {
        method: "POST",
        body: urlencoded,
      };
      let url = `${process.env.REACT_APP_API_SERVER}/getRestaurantData`;
      fetch(url, options)
        .then((data) => data.json())
        .then((data) => {
          dispatch(setSelectedRestaurantData(data));
        })
        .catch((error) => console.error(error));
    }
  }, [userData?.selectedRestaurantLink]);

  return (
    <div
      style={{
        overflow: "-moz-hidden-unscrollable",
      }}
      className="mainDocument flex-item new-item"
      ref={myRef}
    >
      <Card
        className="curved-edges glassmorph"
        sx={{ margin: "20px", height: "100%" }}
      >
        <div style={{ position: "relative" }}>
          <CardActionArea
            onClick={() =>
              userData?.selectedRestaurantLink &&
              window.open(userData?.selectedRestaurantLink, "_blank")
            }
          >
            <div className="foodImages">
              <CardMedia
                component="img"
                image={userData?.selectedRestaurant?.heroImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderHeroBanner;
                }}
                onLoad={executeScroll}
                sx={{
                  maxHeight: "320px",
                }}
              ></CardMedia>
            </div>
            {userData?.selectedRestaurantData?.status && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  margin: "1rem",
                  display: "flex",
                }}
              >
                <ColorCards
                  text={userData?.selectedRestaurantData?.status.toUpperCase()}
                  color={userData?.selectedRestaurantData?.status.toLowerCase()}
                />

                <ColorCards
                  text={
                    userData?.selectedRestaurantData?.rate > 0
                      ? userData?.selectedRestaurantData?.rate
                      : "NA"
                  }
                  color="rating"
                >
                  <StarIcon sx={{ fontSize: "1em", color: "white" }} />
                </ColorCards>
                <ColorCards
                  text={userData?.selectedRestaurantData?.deliverySchedule}
                  color="accessTime"
                  hideOnPhone
                >
                  <AccessTimeIcon sx={{ fontSize: "1em",color: "white" }} />
                </ColorCards>
              </div>
            )}
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
            className="mainContent resBlock"
            // style={{ justifyContent: "flex-start" }}
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
          </CardContent>
          <div
            style={{
              flex: "1 1 auto",
              textAlign: "-webkit-left",
              display: "flex",
              flexWrap: "wrap",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {userData?.selectedRestaurantData && (
              <>
                <MiniInfoCards
                  title="Min Order"
                  value={`AED ${userData?.selectedRestaurantData?.minimumOrderAmount}`}
                />
                <MiniInfoCards
                  title="Delivery Fee"
                  value={`AED ${userData?.selectedRestaurantData?.deliveryFee}`}
                />
                <MiniInfoCards
                  title="Avg Delivery Time"
                  value={userData?.selectedRestaurantData?.avgDeliveryTime}
                />
              </>
            )}
            <Typography
              component="div"
              variant="body1"
              align="left"
              sx={{
                marginTop: "16px",
              }}
            >
              {userData?.selectedRestaurant?.description?.replace(
                /<br \/>/g,
                ""
              )}
            </Typography>
          </div>
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
              let mSIPrice = 0;
              let showPrice = false;
              if (
                userData?.selectedRestaurantData?.mostSellingItemsPrices
                  .length > 1
              ) {
                let mostSellingItem =
                  userData?.selectedRestaurantData?.mostSellingItemsPrices?.filter(
                    (food) => food?.id === data?.id
                  );
                mSIPrice = mostSellingItem[0]?.price || "NA";
                showPrice = true;
              }
              return (
                <Card
                  className="curved-edges foodImages foodImages_inner"
                  key={dataKey}
                  sx={{
                    boxShadow: 1,
                    margin: 1,
                    backgroundImage: `url('${data?.image}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
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
                  <CardContent
                    className="mainContent"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "white",
                    }}
                  >
                    <Card>
                      <Typography
                        component="div"
                        variant="button"
                        sx={{
                          lineHeight: 1.2,
                          padding: 0.7,
                        }}
                      >
                        {showPrice && `AED ${mSIPrice}`}
                      </Typography>
                    </Card>
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
