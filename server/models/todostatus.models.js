// PROJECT:     TOTO_V1
// FILE:        todostatus.models.js

const { Schema, model } = require ('mongoose');
const { ObjectID } = require ('mongodb');

const todostatusSchema = Schema ({
    _id:   {
        type:       ObjectID,
        required:   false,      // let mongodb generate it
    },
    todoitemId: {               // human number
        type: Number,
        required: true,
    },
    todoId: {                   // pointer to todoitems._id
        type:       ObjectID,
        required:   true,
    },
    status: {
        type: String,
        required: true,
    },
    changeDate: {
        type: Date,
        required: false,
    },

}, 
// "collection" : "actual name"
)



// Note since the Collection Name is todostatus -->> need here to write Todostatu without "S"
// It's a Mongoose issue
const TodostatusModel = model('Todostatu' , todostatusSchema);

module.exports = {
    TodostatusModel,
}