var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var express = require('express');

var port = process.env.PORT || 8000;

var app = express();

app.use(bodyParser.json()); //bodyParser next four lines - standard copy/paste
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" })); //set handlebars
app.set("view engine", "handlebars");

app.get('/', function (req, res) {
  res.render('home');
});

app.listen(port, function(){ //makes sure app is working
  console.log("app on " + port);
});
