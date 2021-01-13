// PROJECT:     TOTO_V1
// FILE:        todogroups.models.js

// Service
const { Schema, model } = require('mongoose');
const { ObjectID } = require('mongodb');

// In the schema lists the fields you expect to hold in this connection
const todogroupSchema = Schema ({
    _id:   {
        type:       ObjectID,
        required:   false,
    },
    groupName: {
        type: String,
        required: true,
        unique: true,
    },    
    frequency:  {
        type: String,
        required: false,
    },
})

const TodogroupModel = model('Todogroup' , todogroupSchema);

module.exports = {
    TodogroupModel,
}
