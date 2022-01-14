const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/mogoose');

dotenv.config({ path: 'config/.env' });

const app = express();

//set ejs template engine
app.set('view engine', 'ejs');
app.set('views', './views');

const port = process.env.PORT || 8000;

// listen to port
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Successfully connected to Server`);
});
