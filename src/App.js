import "./App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RestaurantView from "./components/RestaurantView";
import QueryView from "./components/QueryView";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

theme.typography.h2 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.75rem",
  },
};

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
      <div className="mainContent" style={{ justifyContent: "space-between", marginLeft: "1.5em", marginRight: "1.5em" }}>
        <Box
          sx={{
            marginY: "0.5em"
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography
              variant="h2"
              noWrap
              className="mainTitle"
              component="div"
              fontWeight="900"
              fontFamily="Lato"
              letterSpacing="5px"
            >
              WHAT THE FOOD
            </Typography>
          </ThemeProvider>
        </Box>
        <Box
          className="mainContent github"
          sx={{
            // margin: "1em",
            // padding: "1rem",
          }}
        >
          {githubLinks.map((links, linksKey) => {
            return (
              <Card
                key={linksKey}
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: "15px",
                  marginX: 1,
                }}
              >
                <CardActionArea onClick={() => window.open(links, "_blank")}>
                  <CardMedia
                    component="img"
                    image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    sx={{
                      maxWidth: "50px",
                      borderRadius: "12px",
                    }}
                  ></CardMedia>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </div>
      <div className="mainContent" style={{ alignItems: "flex-start" }}>
        <QueryView />
        {isRandomRestaurantSelected && <RestaurantView />}
      </div>
    </div>
  );
}

export default App;
