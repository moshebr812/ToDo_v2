// PROJECT:     TOTO_V1
// FILE:        TodoStatus.js


const expressSrv = require('express');
const routerSrvStatus = expressSrv.Router();  // as we did myApp = expressSrv();
const {ObjectID} = require('mongodb');
// DB Schemas
const {TodostatusModel} = require ('../../models/todostatus.models');



// index.js redirects here via:         myApp.use("/api/todostatus",todostatusRouter);    
// routerSrvStatus.get('/api/todostatus' , async (request, response) =>{
routerSrvStatus.get('/' , async (request, response) =>{
   
    console.log( `${'-'.repeat(40)}  .get() PATH = '/api/todostatus'     params = ${JSON.stringify(request.params)}`);
    
    const debugInfo = {     "service":  "TodoStatus.js",
                            "path":     "/api/todostatus",
                            "method":   "GET",
                            "params":   request.params,
                            "mongoose": ".find({})",
                       };
    try {
        const data = await TodostatusModel
            .find()
            .exec();
            response.json ({
                debugInfo,
                "status": {
                    "success":      true,
                    "numberOfRows": data.length,
                },   
                "data": data,
            });
        } catch (err) {
            response.json ({
                debugInfo,
                "status": {
                    "success":      false,
                    "numberOfRows": data.length,
                },   
                "ERROR": err,
            });
        }
})


routerSrvStatus.get('/:id' , async (request, response) =>{
    const statusObjectId = (request.params.id);
    console.log( `${'-'.repeat(40)}  .get() PATH = '/api/todostatus/:id'     params = ${JSON.stringify(request.params)}   using ObjectId`);
    
    const debugInfo = {     "service":  "TodoStatus.js",
                            "path":     "/api/todostatus",
                            "method":   "GET",
                            "params":   request.params,
                            "mongoose": ".find({})",
                       };
    try {
        const data = await TodostatusModel
            .find( { "_id": ObjectID.createFromHexString( statusObjectId ) })
            .exec();
            response.json ({
                debugInfo,
                "status": {
                    "success":      true,
                    "numberOfRows": data.length,
                },   
                "data": data,
            });
        } catch (err) {
            response.json ({
                debugInfo,
                "status": {
                    "success":      false,
                    "numberOfRows": data.length,
                },   
                "ERROR": err,
            });
        }
})


module.exports = routerSrvStatus;