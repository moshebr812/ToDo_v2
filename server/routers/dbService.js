// PROJECT:     TOTO_V1
// FILE:        dbService.js

// Service
const mongooseSrv = require('mongoose');
// Consts
let mongoDbUrl = 'mongodb://localhost:27017';
const dbTodo = 'todoProject';

// return a valid connection to a given DB
async function dbConnectViaMongoose () {

    if (process.env.DATABASE_URL) { // Working via external server, that includes the full URL + dbName
        // console.log(`dbConnectViaMongoose. mongoDbUrl=${mongoDbUrl}`);
        mongoDbUrl = process.env.DATABASE_URL;

        await mongooseSrv.connect(`${mongoDbUrl}`,
                {   useNewUrlParser: true,
                    useUnifiedTopology: true
                });
    } else {
        console.log('===================================');
        console.log (`from : dbConnectViaMongoose --> process.env.DATABASE_URL return false. !!! working locally`);
        // Note here I add the dbName in the connect command
        await mongooseSrv.connect(`${mongoDbUrl}/${dbTodo}`,    
        {   useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}   // END mogooseConnect


// export so can be used by other *.js files
module.exports = {
    dbConnectViaMongoose,   // the actual connection initiation will be in index.js
}

