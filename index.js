
const express = require('express');
const bodyParser = require('body-parser');


const routesGuestsHandler = require('./routes/Guests.js');


const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// ----------------------------------------------------------------
// Version information
// ----------------------------------------------------------------
const PROJECT = "Ramiware";
const VERSION = "1.00";
const LAST_UPDATE = '2024-04-27';

// ----------------------------------------------------------------
// Setup and Consts
// ----------------------------------------------------------------
const PORT = process.env.PORT || 7470; // backend routing port
const app = express();

// app.use(cors());
app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.0.19:3000", "http://localhost:3001", "http://192.168.0.19:3001"], // LOCAL
  // origin: ["https://dev-kardiakrush.netlify.app", "https://dev-kk-admin-portal.netlify.app"], // DEV
  // origin: ["https://kardiakrush.com", "https://kk-admin-portal.netlify.app"], // PROD
  headers: "*",//['Content-Type', 'Authorization'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],

}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routesGuestsHandler);


//////////////////////////////////////////////
// add this function to test server once live
//////////////////////////////////////////////
app.get('/', (req, res) => {
  res.send("<b>" + PROJECT + " " + process.env.NODE_ENV + " server is running</b><br><br>Version: " + VERSION + "<br>Last-Updated: " + LAST_UPDATE);
})


//////////////////////////////////////////////
// DB Connection
//////////////////////////////////////////////
mongoose.connect(process.env.DB_URI, {})
  .then(() => {
    console.log('DB Connected [RS] [OK]');
  })
  .catch((err) => {
    console.log(err);
  });

//////////////////////////////////////////////
// Start server on specified PORT
//////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log('Version: ' + VERSION);
  console.log('Last-Updated: ' + LAST_UPDATE);
});