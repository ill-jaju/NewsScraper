var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; //creates schema class

var articlesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },

});

var Article = mongoose.model("Article", articlesSchema); //create article model w/ articlesSchema

module.exports = Article; //exports model