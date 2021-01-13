// Example how to use populate with an Array from Parent to Son
const {StoryModule} = require('./stories-eg1.models');
 
const { Schema, model } = require('mongoose');
const { ObjectID } = require('mongodb');

const authorsSchema = new Schema({
  _id: {
    type: ObjectID,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  birthYear: {
    type: Number,
    required: true
  },
  stories: [{
    type: ObjectID,
    ref:  StoryModule,
  }]
});

// Create model from the schema
const AuthorModel = model("Author", authorsSchema);

// Export model
module.exports = {
  AuthorModel,
}

