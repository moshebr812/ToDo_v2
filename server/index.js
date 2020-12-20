// PROJECT:     TOTO_V1
// FILE:        index.js

// Services
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


if (process.env.PORT) {
    // Heroku has defined a port for us
    port = process.env.PORT;
}

// Start listening
myApp.listen(port);