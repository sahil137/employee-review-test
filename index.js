const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/mogoose');

dotenv.config({ path: 'config/.env' });

const app = express();

//set ejs template engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

// for style and script
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

const port = process.env.PORT || 8000;

app.use('/', require('./routes'));

// listen to port
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Successfully connected to Server`);
});
