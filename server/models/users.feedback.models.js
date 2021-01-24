const { Schema, model } = require('mongoose');
const { ObjectID } = require('mongodb');

const userfeedbackSchema = Schema ({
    _id: {
        type:       ObjectID,
        required:   true,   // true: I generate it on the Server before calling insertMany() Once I put this to false Mongodb will allocate _id
                            // false: Mongoose will generate it after i call inserMany()
    },
    userID: {
        type:       ObjectID,
        required:   false,
    },
    module: {
        type:       String,
        required:   true,
    },
    insertDate: {
        type:       Date,
        required:   true,
        default:    new Date(), // I will generate this also on client as I want to log the "duration" user devoted/engaged with feedback screen
    },
    engagementDuration:     {
        type:       Number,
        required:   false,      // will be calculated on Server based on Now()-insertDate
    },
    isSubmit: {
        type:       Boolean,
        required:   true,       // true: user filled the form and pressed submit. false: user pressed cancled, "X" after opening the feedback modal
        default:    false,
    },
    score: {
        type:       Number,
        required:   false,
    },
    closingFlow:  {
        type:         String,
        required:     true,
    },
},  // end of fields
{collection: 'userfeedback'},
)

const UserFeedbackModel = model ('Userfeedback', userfeedbackSchema);

module.exports = {
    UserFeedbackModel,
}


// _id
// userID
// module
// insertDate
// score
// wasFeedbackSubmitted
// actionDuration
