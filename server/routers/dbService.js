// Service
const mongooseSrv = require('mongoose');
//
let mongoDbUrl = 'mongodb://localhost:27017';
const dbTodo = 'todoProject';

// return a valid connection to a given DB
async function dbConnectViaMongoose () {
    if (process.env.DATABASE_URL) {
        // connect to the Database on external hosting at ATLAS
        mongoDbUrl = process.env.DATABASE_URL;
    }
    // connect('SERVERURL/DBName')
    await mongooseSrv.connect(`${mongoDbUrl}/${dbTodo}`,
            {   useNewUrlParser: true,
                useUnifiedTopology: true
            });
}   // END mogooseConnect

module.exports = {
    dbConnectViaMongoose,   // the actual connection initiation will be in index.js
}

