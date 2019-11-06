'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superAgent = require('superagent');

// Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(superAgent());

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
app.get('/location',handleLocation);
app.get('/weather', handleWeather);

// app.get('/location', (request,response) => {
//   try {
//     const geoData = require('./data/geo.json');
//     const city = request.query.data;
//     const locationData = new Location(city,geoData);
//     response.send(locationData);
//   }
//   catch(error) {
//     errorHandler('So sorry, something went wrong.', request, response);
//   }
// });

//Weather Route
function handleWeather(request,response) {
//   try {
//     const darkskyData = require('./data/darksky.json');
//     const weatherSummaries = [];
//     darkskyData.daily.data.forEach (day => {
//       weatherSummaries.push(new Weather(day));
//     });
//     response.status(200).json(weatherSummaries);
//   }
//   catch(error) {
//     errorHandler('So sorry, something went wrong with our weather function.', request, response);
//   }
// }

const = url 
superagent.get(url)
  .then( data=> {
    const weatherSummaries = data.body.daily.data,map (day => {
      return new Weather(day);
    });
    response.status(200).json(weatherSummaries);
  })
  .catch( ()=> {
    errorHandler('So sorry, something went really wrong', request, response);
  });

app.use('*', notFoundHandler);
app.use(errorHandler);

// HELPER FUNCTIONS

//Location Function
//function Location(city, geoData) {
  //this.search_query = city;
  //this.formatted_query = geoData.results[0].formatted_address;
  //this.latitude = geoData.results[0].geometry.location.lat;
  //this.longitude = geoData.results[0].geometry.location.lng;
//}

//Route Handlers
function handleLocation(request,response) {

const = url 

superagent.get(url)
  .then(data => {
    const geoData = data.body
    const location = new Location(request.query.data, geoData);
    response.send(location);
  })
  .catch( error => {
    console.error(error);
    response.status(500).send('Satus: 500. Sorry, there is something not quite right');
  })
}

//Weather Function
function Weather(day) {
  this.time = 
  this.forecast = day.summary
}

function notFoundHandler(request,response) {
  response.status(404).send('huh?');
}

function errorHandler(error,request,response) {
  response.status(500).send(error);
}

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`) );
