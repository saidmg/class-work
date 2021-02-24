const express = require('express');
const app = express();

const PORT = 3000; // for Heroku ? process.env.PORT || 3000

// will share any static html files with the browser
app.use( express.static('html') );
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
