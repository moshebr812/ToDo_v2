// PROJECT:     TOTO_V1
// FILE:        todoitems.models.js

// Service
const { Schema, model } = require('mongoose');
const { ObjectID } = require('mongodb');

// In the schema lists the fields you expect to hold in this connection
const todoitemSchema = Schema ({
    _id:   {
        type:       ObjectID,
        required:   false,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },    
    title:  {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: false,
    },
    complexity: {
        type: String,
        required: false,
    },
    details: {
        type: String,
        required: false,
    },
    startDate: {
        type:  Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    insertDate: Date,
    required:   false,
})


// Bind your schame to a collection in the db
//      note the collection name in the db is plural: users, posts, comments, in lowercase
//      but pass to model the name in "single", in Camel case

// from here on to access the collection "toitem" call model TodoitemModel
const TodoitemModel = model('Todoitem' , todoitemSchema);

module.exports = {
    TodoitemModel,
}
