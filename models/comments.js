var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; //creates schema class

var commentsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
      type: String,
      required: true
  }

});

var Comments = mongoose.model("Comments", commentsSchema); //create article model w/ articlesSchema

module.exports = Comments; //exports model