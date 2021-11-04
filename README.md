# Getting Started with what-the-food-react

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the application

1. Clone the application to your local directory
2. Create a .env file with the following values
  - REACT_APP_API_SERVER = API SERVER ADDRESS
  - REACT_APP_MAP_BOX = MAPBOX STYLED MAP URL
3. Run the app in development mode using `npm start`

## How to generate MAPBOX STYLED MAP URL

1. Go to [mapbox.com](https://www.mapbox.com) and create an account.
2. Once the account is created, Generate an API token on [account.mapbox.com](htts://account.mapbox.com) page. Copy it to an editor of your choice for later use
3. Go to (https://studio.mapbox.com/)[https://studio.mapbox.com/] page to create a style for your map. Edit the style as you like.
4. Once the styling is done, click on the 3 dots on the top left corner of the window next to Style > Basic text, and copy the style URL. The url should look something like this. 
 `mapbox://styles/username/25digitkey`. Copy it to your editor and remove `mapbox://styles/` from the text. We only need the username and the style key
5. Create your link by adding the api token and the style key in the url below.
  `https://api.mapbox.com/styles/v1/STYLEKEY/tiles/256/{z}/{x}/{y}@2x?access_token=YOUR_API_TOKEN_HERE`
