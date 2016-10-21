// modules =====================================================
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

// set up our port =============================================
var PORT = process.env.PORT || 3344;

// middleware ==================================================
app.use(logger('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(__dirname + "/public"));


// routes ======================================================

var route = require('./routes/route.js');
route.routes(app); //pass our application into our routes

app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
}); //start server and console log on connection
