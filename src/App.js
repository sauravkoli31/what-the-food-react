import "./App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RestaurantView from "./components/RestaurantView";
import QueryView from "./components/QueryView";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useSelector } from "react-redux";

require("dotenv").config();
function App() {
  const userData = useSelector((state) => state.userData);
  const githubLinks = [
    "https://github.com/sauravkoli31/what-the-food-react",
    "https://github.com/sauravkoli31/what-the-food-backend",
  ];

  let isRandomRestaurantSelected = userData?.selectedRestaurant;

  return (
    <div className="App">
      <div className="mainContent" style={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            margin: "1em",
            
          }}
        >
          <Typography
            variant="h2"
            noWrap
            component="div"
            fontWeight="900"
            fontFamily="Lato"
            letterSpacing="5px"
          >
            WHAT THE FOOD
          </Typography>
        </Box>
        <Box
          className="mainContent"
          sx={{
            margin: "1em",
            padding: "1rem",
          }}
        >
          <Typography
            variant="body2"
            noWrap
            component="div"
            fontWeight="900"
            fontFamily="Lato"
            letterSpacing="5px"
          >
            GTIHUB LINKS
          </Typography>
          {githubLinks.map((links, linksKey) => {
            return (
              <Card key={linksKey}>
                <CardActionArea onClick={() => window.open(links, "_blank")}>
                  <CardMedia
                    component="img"
                    image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    sx={{
                      maxWidth: "50px",
                      borderRadius: "12px",
                      margin: "0.5em",
                    }}
                  ></CardMedia>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </div>
      <div className="mainContent" style={{alignItems:"flex-start"}}>
        <QueryView />
        {isRandomRestaurantSelected && <RestaurantView />}
      </div>
    </div>
  );
}

export default App;
