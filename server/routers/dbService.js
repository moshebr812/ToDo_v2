// PROJECT:     TOTO_V1
// FILE:        dbService.js

// Service
const mongooseSrv = require('mongoose');
// Consts
let mongoDbUrl = 'mongodb://localhost:27017';
const dbTodo = 'todoProject';

// return a valid connection to a given DB
async function dbConnectViaMongoose () {
    console.log (`dbConnectViaMongoose() from dbService.js ========>>>>>>>    DATABASE_URL = ` + process.env.DATABASE_URL);
    
    if (process.env.DATABASE_URL) {
        console.log (`dbConnectViaMongoose DATABASE_URL = ` + process.env.DATABASE_URL);
        // connect to the Database on external server
        mongoDbUrl = process.env.DATABASE_URL;

        console.log(`dbConnectViaMongoose. mongoDbUrl=${mongoDbUrl}`);
        // connect('SERVERURL/DBName')
        await mongooseSrv.connect(`${mongoDbUrl}`,
                {   useNewUrlParser: true,
                    useUnifiedTopology: true
                });
        // mongoDbUrl = 'I PUT Grabage on purpose';
    } else {
        console.log('===================================');
        console.log (`from : dbConnectViaMongoose --> process.env.DATABASE_URL return false`);



        await mongooseSrv.connect(`${mongoDbUrl}/${dbTodo}`,
        {   useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    console.log(`dbConnectViaMongoose. mongoDbUrl=${mongoDbUrl}`);
    // connect('SERVERURL/DBName')
   
}   // END mogooseConnect


// export so can be used by other *.js files
module.exports = {
    dbConnectViaMongoose,   // the actual connection initiation will be in index.js
}

