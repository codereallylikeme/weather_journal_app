// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
bodyParser = require('body-parser');
require('dotenv').config();

app = express();

// Start up an instance of app
// baseURL and APi key Variables

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { json } = require('body-parser');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(3000, () => console.log('listening at port 3000'));

app.get('/alldata', sendData);

function sendData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

app.post('/add', addData);

function addData(req, res) {
  const newEntry = {
    temp: req.body.temp,
    city: req.body.city,
    description: req.body.description,
    date: req.body.date,
    country: req.body.country,
    content: req.body.content,
    icon: req.body.icon,
  };
  projectData = newEntry;
  res.send(newEntry);
}
