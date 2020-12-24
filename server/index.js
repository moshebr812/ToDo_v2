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
let connetionInfo = {   "hostingServer":"unknown", 
                        "hostingPort":"unknown",
                        "envLanguage":"unknown"};


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
myApp.use("/",expressSrv.static(path.join(__dirname, '../client/build')));
//
myApp.get ('/api/todoServerParameters' ,  async (request, response) => {
    response.json  ( connetionInfo );
})

// Set the relevant port, stamp the server+port for the About Screen
if (process.env.PORT) {
    // Heroku has defined a port for us
    port = process.env.PORT;
    connetionInfo.hostingServer = "external, Heroku"
} else {
    connetionInfo.hostingServer = "localhost"
}
connetionInfo.hostingPort = port;
connetionInfo.envLanguage = process.env.LANG;

// Start listening
myApp.listen(port);