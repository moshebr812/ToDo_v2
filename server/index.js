const expressSrv = require('express');
const myApp = expressSrv();
const { dbConnectViaMongoose } = require('./routers/dbService');

// for Heorku & build server
const path = require('path');

// expressSrv.Router() ==> Not needed here. Applied in each specific module
// const routerSrv = expressSrv.Router();  // this now enabled me to catch calls from outside based on the URL I will define on the routerSrv

// Connect to the DB via Mongoose service
dbConnectViaMongoose();
// router services per each Module
const todoitemsRouter = require ('./routers/Todo/TodoItems');
const todostatusRouter = require ('./routers/Todo/TodoStatus');


// Enable to show in the About Client Screen if u r running locally or via Heroku
let connectionInfo = {   "hostingServer":"unknown", 
                        "hostingPort":"unknown",
                        "envLanguage":"pending local read"};


// Variables & settings
let port = 3002;
myApp.set('server version:  s.0.1');        // can define my own variables 
myApp.set("json spaces", 3);                // so the output is broken to lines and more readable


// 
console.clear();
console.log(`${"x".repeat(30)}\nfile:  index.js  .... STARTING  SERVER  ......\n ....... listening on port:       ${port} \n${"x".repeat(30)}`);

// middleware       - standard
myApp.use(expressSrv.json());   // convert valid JSON structures to JS Objects
// middleware       - Set the list of Business Routers as middleware
myApp.use("/api/todoitems", todoitemsRouter);
myApp.use("/api/todostatus", todostatusRouter);
myApp.get ('/api/todoServerParameters' ,  async (request, response) => {
    response.json  ( connectionInfo );
})

myApp.use("/",expressSrv.static(path.join(__dirname, '../client/build')));
//


// hostingPort
if (process.env.PORT) {
    port = process.env.PORT;  // Heroku has defined a port for us
} // else we already set a local port above locally to 3002
connectionInfo.hostingPort = port;


// hostingServer
if (process.env.HOSTING_SERVER_NAME) {
    connectionInfo.hostingServer = process.env.HOSTING_SERVER_NAME
} else {
    connectionInfo.hostingServer = "localhost"
}

if (process.env.LANG) {
    connectionInfo.envLanguage = process.env.LANG;
} // else I still need to get it from somewhere


console.log ('=============================================');
console.log ('=============================================');
console.log ('=============================================');
console.log('process.env.DATABASE_URL = ' + process.env.DATABASE_URL ) ;
// Start listening
myApp.listen(port);