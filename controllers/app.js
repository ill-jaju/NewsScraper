var mongoose = require('mongoose'); //dependencies
var express = require('express'); //route handlers 
var router = express.Router();
var request = require('request'); //scraping tools
var cheerio = require('cheerio');
var Article = require('../models/article.js');

mongoose.Promise = Promise; //set mongoose to leverage built in js es6 promises

router.get('/', function (req, res) {
  res.render('index');
})

router.get('/scrape', function(req, res){
  //scrape data
  request("https://arstechnica.com/", function(error, response, html) {

    var $ = cheerio.load(html); // load the HTML into cheerio and save it to a variable
    
    var result = {}; // An empty array to save the data that we'll scrape

    $("article.type-report").each(function(i, element) {

      result.title = $(element).find("h2").text();
      result.link = $(element).find("h2").find("a").attr("href");
      result.author = $(element).find(".byline").find("a").text();
      result.summary = $(element).find(".excerpt").text().slice(0, 200);
      // var picture = $(element).find(".listing-small").css("background-image:url").text()

      // results.push({ // save these results in an object that we'll push into the results array we defined earlier
      //   title: title,
      //   link: link,
      //   author: author,
      //   summary: summary,
      //   // picture: picture
      // });
      var entry = new Article(result); //creates new entry using Article model from import, passes the entries from scrape 
      
      entry.save(function(err, data) { //saves entry to database
        if (err) {
          console.log('scrape ' + err);
        } else {
          console.log(data);
        }
      });
      res.send("Scrape Complete");
    });

    // Log the results once you've looped through each of the elements found with cheerio
    // console.log(results);
  });
})

router.get('/articles', function(req, res) {
  Article.find({}, function(err, data) {
    if (err) {
      console.log ('article ' + err);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;