'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
// const superAgent = require('superagent');

// Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
// app.use(superAgent());  // Is this required?

app.get('/', (request,response) => {
  response.send('Home Page!');
});

app.get('/bad', (request,response) => {
  throw new Error('Page not found');
});

// The callback can be a separate function. Really makes things readable
app.get('/about', aboutUsHandler);

function aboutUsHandler(request,response) {
  response.status(200).send('About Us Page');
}

// API Routes
app.get('/location', (request,response) => {
  try {
    const geoData = require('./data/geo.json');
    const city = request.query.data;
    const locationData = new Location(city,geoData);
    response.send(locationData);
  }
  catch(error) {
    errorHandler('So sorry, something went wrong.', request, response);
  }
});

//Weather Route
app.get('/weather', (request,response) => {
  //try {
    const darkskyData = require('./data/darksky.json');
    const weather = request.query.data;
    //const weatherData = new Weather(time,forecast); 
    response.send(darkskyData);
  //}
  catch(error) {
    errorHandler('So sorry, something went wrong with our weather function.', request, response);
  }
});

app.use('*', notFoundHandler);
app.use(errorHandler);

// HELPER FUNCTIONS

//Location Function
function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

//Weather Function
function Weather(time,forecast ) {
  this.time = darkskyData.results[0].time; //reformat time
  this.forecast = darkskyData.results[0];
}

function notFoundHandler(request,response) {
  response.status(404).send('huh?');
}

function errorHandler(error,request,response) {
  response.status(500).send(error);
}



// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`) );