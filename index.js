const express = require('express');
const port = 8000;

const app = express();

app.listen(port, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Successfully connected to Server`);
});
