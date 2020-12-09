// PROJECT:     TOTO_V1
// FILE:        dbService.js

// Service
const mongooseSrv = require('mongoose');
// Consts
const mongoDbUrl = 'mongodb://localhost:27017';
const dbTodo = 'todoProject';

// return a valid connection to a given DB
async function dbConnectViaMongoose () {
    await mongooseSrv.connect(`${mongoDbUrl}/${dbTodo}`,
            {   useNewUrlParser: true,
                useUnifiedTopology: true
            });
}   // END mogooseConnect


// export so can be used by other *.js files
module.exports = {
    dbConnectViaMongoose,   // the actual connection initiation will be in index.js
}

