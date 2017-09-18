var mongoose = require('mongoose');
var express = require('express'); //route handlers 
var router = express.Router();
var request = require('request'); //scraping tools
var cheerio = require('cheerio');

mongoose.Promise = Promise; //set mongoose to leverage built in js es6 promises

router.get('/', function (req, res) {
    res.render('index');
})

module.exports = router;