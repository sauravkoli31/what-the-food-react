import "./App.css";
import CuisineSelect from "./components/CuisineSelect";
import LocationSelect from "./components/LocationSelect";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GetRestaurantsButton from "./components/GetRestaurantsButton";
import SelectedRestaurant from "./components/SelectedRestaurant";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Divider from "@mui/material/Divider";
require('dotenv').config()


function App() {
  const userData = useSelector((state) => state.userData);
  let isCuisineVisible = userData?.cuisine?.length > 0;
  let isCuisineSelected = userData?.cuisineSelect?.length > 0;
  let isRandomRestaurant = userData?.selectedRestaurant;
  let topSellingItemPresent =
    userData?.selectedRestaurant?.mostSellingItems?.length > 0;
  console.log(isRandomRestaurant);
  return (
    <div className="App">
      <div className="mainContent">
        <Box
          className="topBox"
          sx={{
            width: "100%",
            // height: "7vh",
            marginTop: 3,
            marginLeft: 5,
            marginRight: 5,
            backgroundColor: "primary.dark",
            "&:hover": { opacity: [0.9, 0.8, 0.7] },
          }}
        >
          <Typography
            variant="h3"
            noWrap
            component="div"
            color="white"
            fontFamily="Barlow, sans-serif"
            fontWeight="800"
            margin="1.7vh"
          >
            WHAT THE FOOD
          </Typography>
        </Box>
      </div>
      <div className={`mainContent`} style={{maxWidth: "80%", margin: "0 auto"}}>
        <div className="flex-item firstElem">
        <LocationSelect
          className="flex-item"
          sx={{
            boxShadow: 1,
            flex: "1 0 auto",
            margin: 5,
          }}
        />
        </div>
        {isCuisineVisible && (
        <div className="flex-item new-item">
          <CuisineSelect
            className={`flex-item ${isCuisineVisible && "new-item"}`}
            sx={{
              boxShadow: 1,
              flex: "1 0 auto",
              margin: 5,
            }}
          />
        </div>
        )}
        {isCuisineSelected && 
        <div className="flex-item new-item1" style={{flexGrow:"1", flex:"1"}}>
        <GetRestaurantsButton />
        </div>
        }
      </div>
      <Divider sx={{ margin: 1 }} />
      <div
        className={"mainContent"}
        style={{ marginX: 55, alignItems: "flex-start" }}
      >
        {isRandomRestaurant && (
          <div style={{ textAlign: "left" }}>
            <Card
              style={{
                marginTop: "1em",
                marginBottom: "1em",
                padding: "1em 2em",
                width: "fit-content",
              }}
              className="cardStyle muted-color"
            >
              <Typography
                variant="button"
                style={{
                  color: "white",
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: "bolder",
                }}
              >
                RESTAURANT
              </Typography>
            </Card>
            <SelectedRestaurant
              image={userData?.selectedRestaurant?.heroImage}
              title={userData?.selectedRestaurant?.name}
              logo={userData?.selectedRestaurant?.logo}
            />
          </div>
        )}
        <div style={{ textAlign: "left" }}>
          {topSellingItemPresent && (
            <Card
              style={{
                marginTop: "1em",
                marginBottom: "1em",
                padding: "1em 2em",
                width: "fit-content",
              }}
              className="cardStyle muted-color"
            >
              <Typography
                variant="button"
                style={{
                  color: "white",
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: "bolder",
                }}
              >
                TOP SELLING ITEM
              </Typography>
            </Card>
          )}
          <div className={"mainContent foodContent"}>
            {isRandomRestaurant &&
              userData?.selectedRestaurant?.mostSellingItems?.map((items) => {
                return (
                  <Card
                    className="cardStyle foodImages"
                    sx={{
                      boxShadow: 1,
                      margin: 1,
                      width: 250,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={items.image}
                      alt="green iguana"
                    />
                    <CardContent className="mainContent">
                      <Typography
                        component="div"
                        variant="overline"
                        sx={{
                          lineHeight: 1.2,
                        }}
                      >
                        {items.name}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
