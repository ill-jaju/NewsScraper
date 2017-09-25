var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; //creates schema class

var articlesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true //makes sure no news duplicates occur
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
  date: {
    type: String,
    required: true,
    trim: true
  },
  isSaved: Boolean

});

articlesSchema.methods.saved = function() {
  this.isSaved = false;
  return this.isSaved;
};

var Article = mongoose.model("Article", articlesSchema); //create article model w/ articlesSchema

module.exports = Article; //exports model