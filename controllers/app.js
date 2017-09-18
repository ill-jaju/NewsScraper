var mongoose = require('mongoose');
var express = require('express'); //route handlers 
var router = express.Router();
var request = require('request'); //scraping tools
var cheerio = require('cheerio');

mongoose.Promise = Promise; //set mongoose to leverage built in js es6 promises

router.get('/', function (req, res) {
  res.render('index');
})

//scrape data
request("https://arstechnica.com/", function(error, response, html) {

  var $ = cheerio.load(html); // load the HTML into cheerio and save it to a variable
  
  var results = []; // An empty array to save the data that we'll scrape

  $("article.type-report").each(function(i, element) {

    var title = $(element).find("h2").text();
    var link = $(element).find("h2").find("a").attr("href");
    var author = $(element).find(".byline").find("a").text();
    var summary = $(element).find(".excerpt").text().slice(0, 200);

    results.push({ // save these results in an object that we'll push into the results array we defined earlier
      title: title,
      link: link,
      author: author,
      summary: summary
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

module.exports = router;