const { Schema, model } = require('mongoose');
// const mongooseSrv  = require('mongoose');
const { ObjectID } = require('mongodb');

const userSchema = Schema ({
    _id: {
        type:       ObjectID,
        required:   false,  // Once I put this to false Mongodb will allocate _id
        // default:    mongooseSrv.Types.ObjectId(),   // I can generate this here instead on in the server
    },
    loginName: {
        type:       String,
        required:   true,
    },
    registeredDate: {
        type:       Date,
        required:   false,
        default:    new Date(),  // will be updated by Server
    },
    firstName: {
        type:       String,
        required:   false,
    },
    lastName: {
        type:       String,
        required:   false,
    },
})

const UserModel = model ('User', userSchema);

module.exports = {
    UserModel,
}
