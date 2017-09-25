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
      result.date = $(element).find(".date").text();
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

    });

    // Log the results once you've looped through each of the elements found with cheerio
    // console.log(results);
  });
  res.redirect('/articles'); //after scraping, displayes articles page
});

router.get('/articles', function(req, res) { //get articles from db
  Article.find({}, function(err, data) { //grabs articles in array
    if (err) {
      console.log ('article ' + err);
    } else {
      res.render('index', { scrapedData: data }) //handlebars grabs index template, places data info into respective locations
    }
  });
});

router.put('/articles/:id', function(req, res) { //saves article
  Article.findOneAndUpdate({'_id': req.params.id}, {'isSaved': true}, function(err, data) {
    if (err) {
      console.log ('cant save article' + err);
    } else {
      res.redirect('/articles')
    }
  });
});

router.get('/saved', function(req, res) { //retrieves saved articles
  Article.find({'isSaved': true}).exec(function(err, data) {
    if (err) {
      console.log ('article ' + err);
    } else {
      res.render('saved', { savedData: data }); //handlebars grabs saved template, places data info into respective locations
    }
  });
});

router.delete('/saved/article/:id', function(req, res) {
  Article.remove({'_id': req.params.id}, function(err, data) {
    if (err) {
      console.log ('cant delete article' + err);
    } else {
      res.redirect('/saved')
    }
  });
});

module.exports = router;