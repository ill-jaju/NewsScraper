var bodyParser = require('body-parser'); //dependencies
var exphbs = require("express-handlebars");
var express = require('express');
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise; //set mongoose to leverage built in js es6 promises

var port = process.env.PORT || 8000; //express init
var app = express();

app.use(logger("dev")); //morgan + body parser with app
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public')); //make public a static directory

app.engine("handlebars", exphbs({ defaultLayout: "main" })); //set handlebars
app.set("view engine", "handlebars");

//mongoose db config
var databaseUri = 'mongodb://localhost/newsScraperDB'; //local dir
// var MONGODB_URI = 'mongodb://heroku_gn16lnt5:c9k37d228nl33tk4k49b6fdh1k@ds139964.mlab.com:39964/heroku_gn16lnt5'; //heroku config

if (process.env.MONGODB_URI) { //if being run in app
  mongoose.connect(process.env.MONGODB_URI);
} else { //if on local machine
  mongoose.connect(databaseUri);
}
//db config end

var db = mongoose.connection;

db.on('error', function(error) { //displays errors
  console.log('mongoose error: ', error);
});

db.once('open', function() { //console log success if connected to mongoose 
  console.log('mongoose connection successful');
});

var routes = require('./controllers/app.js'); //routes
app.use('/', routes);

app.listen(port, function(){ //makes sure app is working
  console.log("app on " + port);
});