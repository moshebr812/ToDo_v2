// PROJECT:     TOTO_V1
// FILE:        TodoItems.js


// npm install moment
// https://momentjs.com/

// Connecting via DB Services

// Services
const expressSrv = require('express');
const routerSrv = expressSrv.Router();  // as we did myApp = expressSrv();
const {ObjectID} = require('mongodb');
// DB Schemas
const {TodoitemModel} = require ('../../models/todoitems.models');
const {TodostatusModel} = require ('../../models/todostatus.models');

/*      =============        Mongoose       =================
    No need for a direct link to dbServices.
    Mongoose DB connection is initiated in index.js
    The connection to each specific collection is done via the *models.js
    const {TodoitemModel} = require ('../../models/todoitems.models');
*/

// index.js defined the following middleware        myApp.use("/api/todoitems",todoitemsRouter);
// routerSrv.get ('/api/todoitems', async (request, response) => {
routerSrv.get ('/', async (request, response, next) => {
    console.log( `${'-'.repeat(40)}  .get( a.ll ) PATH = '/api/todoitems'     params = ${JSON.stringify(request.params)}`);
   
    const debugInfo = {     "service":  "TodoItems.js",
                            "path":     "/api/todoitems",
                            "method":   "GET",
                            "params":   request.params,
                            "mongoose": ".find({})",
                       };
    try {
    const data = await TodoitemModel
        // .find( seacrhString, 'id  company.name address.street name email username')
        .find()
        // .populate('gModel')
        //.lookup({ from: 'tickets', localField: "route_name", foreignField: 'route_name', as: 'ticket' })
        // .lookup({ from: 'gModel', localField: '_id', foreignField: 'groupId', as: 'info'})
        .collation({ locale: "en", strength: 2 })
        .sort( [['title', 'asc']])
        .exec();
        response.json (data);
    }
    catch (err)  {
        next (err)
    }
});

routerSrv.get ('/getNextFreeDebugId', async (request, response, next) => {
    
    console.log( `${'-'.repeat(40)}  .get() PATH = '/api/todoitems/getNextFreeDebugId'     params = ${JSON.stringify(request.params)}   `);
    //.find({country_id : 10}).sort({score : -1}).limit(1);
    try {
        const data = await TodoitemModel
            .find ()
            // .find ()
            .select ('_id id')
            .sort ( {id: -1})
            .limit (1)
            .exec();
 
            response.json (data);
   } 
    catch (err) {
        console.log (`failed in TodoItems.js .get('/getNextFreeDebugId)  ${err}`);
        next(err)
    }
});


// This API will return a COUNT(*), field_name GROUP BY field_name --> where field_name is the input
routerSrv.get ('/aggregateCountByFieldName/:field_name' , async (request, response, next) => {
    let fieldName = request.params.field_name;
    console.log( `${'-'.repeat(40)}  .get() PATH = '/aggregateCountByFieldName/:field_name'     params = ${JSON.stringify(request.params)}   `);

    try {
        const data = await TodoitemModel
        .aggregate( [
            // { $match: { "status": { $in: ["RO", "IP", "CMP"] } } },
            { $group: {
                        // "_id": "$status",    // this creates the break by field
                        // "_id": "status",     // this brings a total count, no group by
                        "_id": `$${fieldName}`, // this enables me to have a generic component "CountAndGroupByFieldName"
                        "count": { "$sum": 1 }
                    }
            }
        ])
        // .find ()
        // .select ('_id id')
        // .sort ( {id: -1})
        // .limit (1)
        .exec();
        response.json (data);
    } catch (err) {
        console.log (`Server --> FAILED AT:  aggregateCountByFieldName. field_Name=${fieldName}`, err);
        next(err);
    }
    // response.json ({'debug': 'from /aggregateCountByFieldName/:field_name', "fieldName": fieldName});
    // response.json (data);
})

routerSrv.get ('/aggregateCountByStatus' , async (request, response, next) => {
    console.log( `${'-'.repeat(40)}  .get() PATH = '/api/todoitems/aggregateCountByStatus'     params = ${JSON.stringify(request.params)}   `);
    
    try {
        
        const data = await TodoitemModel
        .aggregate( [
            // { $match: { "status": { $in: ["RO", "IP", "CMP"] } } },
            { $group: {
                        "_id": "$status",
                        "count": { "$sum": 1 }
                    }
            }
        ])
        // .find ()
        // .select ('_id id')
        // .sort ( {id: -1})
        // .limit (1)
        .exec();
        response.json (data);
    } catch (err) {
        console.log ('Server --> FAILED AT:  aggregateCountByStatus', err);
        next(err);
    }
})


// the /:id must come after all the /textPath
routerSrv.get ('/:id', async (request, response) => {
    
    const todoObjectID = request.params.id;


    console.log( `${'-'.repeat(40)}  .get(AAA) PATH = '/api/todoitems/:id'     params = ${JSON.stringify(request.params)}    using _id(ObjectID) :id = ${todoObjectID}`);

    const debugInfo =   {   "service":  "TodoItems.js",
                            "path":     "/api/todoitems/:id",
                            "method":   "GET",
                            "params":   request.params,
                            "mongoose": ".find( {by _id})",
                        };

    if ( !todoObjectID) {
        response.json ({
            debugInfo,
            "status": {
                "success":      false,
            },   
            "ERROR": "input {_id} is undefined.",
        });
   }
    // try {
        const data = await TodoitemModel
            .find ( {"_id": ObjectID.createFromHexString(todoObjectID)} )
            .exec();
            response.json (data);
           
    // } 
    // catch (err) {
    //     response.json ({
    //         debugInfo,
    //         "status": {
    //             "success":      false,
    //             "numberOfRows": "not relevant",
    //         },   
    //         "ERROR": {err},
    //     });
    // }
});


//post - create
routerSrv.post ('/', async (request, response, next) => {
    
    console.log( `${'-'.repeat(40)}  .post() PATH = '/api/todoitems/'     new title = ${JSON.stringify(request.body.title)}`);
    
    console.log ('Server -->> post. request.body ==??', request.body);
    const debugInfo =   {   "service":  "TodoItems.js",
                            "path":     "/api/todoitems/",
                            "method":   "POST",
                            "params":   request.params,
                            "mongoose": ".insertMany(data)",
                        };
    const newTodo = request.body;
    
    try {
        let new_id = new ObjectID();
        newTodo['_id'] = new_id;


        const data = await TodoitemModel
            .insertMany (newTodo)
            // .save (newData) 
            // .exec();
            console.log ('Server -->> Inserted 1 row into todoitem.  NEW _id = /' , newTodo);

        todoStatusRecord = {
                "todoId": newTodo._id,                  // 
                "todoitemId": newTodo.id,       // human debug
                "status": "NS",  // Not Started
                "changeDate": newTodo.insertDate,  // populated on client on record todoitem
            }
       
        const data2 = await  TodostatusModel
            .insertMany (todoStatusRecord)            
            console.log ('Inserted 1 row into todostatus.  object = ',todoStatusRecord);

            response.json ({
                debugInfo,
                "todoItemData": data,
                "todoStatusData": data2
            }); 

    }  catch (e) {
        console.log(`Server -->> FAILED ........post ('/api/dotoitems/)`,e);
        next(e);
    }
});


// put - replace the full record
routerSrv.put ('/:id', async (request, response, next) => {
    const todoObjectID = request.params.id; // this is the mongodb _id field
    console.log( `${'-'.repeat(40)}  .put() PATH = '/api/todoitems/:id'     params = ${JSON.stringify(request.params)}    using _id (mongo ObjectID)  = ${todoObjectID}`);
    console.log ('put. request.body ==??', request.body);
    const debugInfo =   {   "service":  "TodoItems.js",
                            "path":     "/api/todoitems/:id",
                            "method":   "PUT",
                            "params":   request.params,
                            "mongoose": ".findOneAndUpdate( {by _id ObjectID})",
                        };
    const filter = { "_id":ObjectID.createFromHexString(todoObjectID)};
    const update = request.body;
    const options ={ new: true } ; // do I see the old or new values of the updated element
    
    let todoStatusRecord = {
        "todoId": update._id,          // MongoId
        "todoitemId": update.id,       // Human debug
        "status": update.status,       // The new Status
        "changeDate": update.insertDate,  // populated on client on record todoitem
    }        
    
    try {
        let data2={} // case we insert a log into itemstatus table

        const data = await TodoitemModel
            .findOneAndUpdate ( filter, update, options )       // await Character.findOneAndUpdate(filter, update, options);
            .exec();

            // if there was a status change, client adds 3 fields to the structure:
                //data['insertDate']=  convertDateFormat ((new Date),"FULL_1_NO_SEC");
                //data['insertStatusChange']=true;
                //data['previousStatus']=itemAtWork.status;
            if (update.insertStatusChange) {
                
               
                console.log ('Going to insert 1 row to todostatus. object = ',todoStatusRecord);
                data2 = await  TodostatusModel
                    .insertMany (todoStatusRecord)            
                
            } // end insert status change into todostatus    

            response.json ({
                debugInfo,
                "todoItemData": data,
                "todoStatusData": data2 });
                       
    }  catch (e) {
        console.log(`FAILED ........put('/api/dotoitems/:_id')`,e);
        // throw new Error("Server -->> FAIL TO ADD todoitem");
        next(e);
    }
});

// patch update only fields that exist
routerSrv.patch ('/:id', async (request, response) => {
    const todoObjectID = request.params.id;
    console.log( `${'-'.repeat(40)}  .patch() PATH = '/api/todoitems/:id'     params = ${JSON.stringify(request.params)}    using _id.ObjectID :id = ${todoObjectID}`);
    console.log ('patch. request.body ==??', request.body);
    const debugInfo =   {   "service":  "TodoItems.js",
                            "path":     "/api/todoitems/:id",
                            "method":   "PATCH",
                            "params":   request.params,
                            "mongoose": ".findOneAndUpdate( {by _id ObjectID})",
                        };
    const filter = { "_id":ObjectID.createFromHexString(todoObjectID)};
    const update = request.body;
    const options ={ new: true } ; 
                        
    const data = await TodoitemModel
        .findOneAndUpdate ( filter, update, options )       // await Character.findOneAndUpdate(filter, update, options);
        .exec();
        response.json ({
            debugInfo,
            "data": data,
        });                    
});


// routerSrv.delete ('/api/todoitems', async (request, response) => {
routerSrv.delete ('/', async (request, response) => {
    console.log( `${'-'.repeat(40)}  .delete() PATH = '/api/todoitems'     params = ${JSON.stringify(request.params)}`);
        
    const debugInfo =  {    "service":  "TodoItems.js",
                            "path":     "/api/todoitems",
                            "method":   "DELETE",
                            "params":   request.params,
                            "mongoose": ".delete({})",
                        };
    try {                
        const data = await TodoitemModel 
            .remove({})
            .exec()            ;
            response.json ({
                debugInfo,
                "status": {
                    "success":      true,
                    "numberOfRows": "refer to data.deletedCount",
                },   
                "data": data,
            });
    } catch (err) {
        response.json ({
            debugInfo,
            "status": {
                "success":      false,
                "numberOfRows": "refer to data.deletedCount",
            },   
            "data":  data,  
            "ERROR": err,
        });
    }
});
    
// routerSrv.delete ('/api/todoitems/:id', async (request, response) => {
routerSrv.delete ('/:id', async (request, response) => {
    // const idToDel = parseInt (request.params.id);
    const todoObjectID = request.params.id;
    console.log( `${'-'.repeat(40)}  .delete() PATH = '/api/todoitems/:id'     params = ${JSON.stringify(request.params)}    using _id = ${todoObjectID}` );
        
    const debugInfo = {     "service":  "TodoItems.js",
                                "path":     "/api/todoitems/:id",
                                "method":   "DELETE",
                                "params":   request.params,
                                "mongoose": ".delete({by _id ObjectID})",
                      };

    
    try {
        // 1st delete sons from todostatus, then from todoitems
        const delSons = await TodostatusModel 
                .deleteMany( {"todoId": ObjectID.createFromHexString(todoObjectID)})
                .exec();
        // delSons.ok ==> status of delete from todostatus
        // delSons.deletedCount ==>  number of rows deleted from todostatus
        
        console.log(`after deleting from "todostatus".  Status: ${delSons.ok}.  Deleted Rows: ${delSons.deletedCount}`);

        // Now delete the parent
        const data = await TodoitemModel
                .deleteOne ({"_id": ObjectID.createFromHexString(todoObjectID)})
                .exec();
                response.json ({
                     debugInfo,
                     "todostatus": {
                         "success":      delSons.ok,
                         "deletedRows":  delSons.deletedCount,
                     },   
                     "data": data,
                 });
                
        } catch (err) {
            response.json ({
                debugInfo,
                "status": {
                    "success":      false,
                },   
                "ERROR": err,
            });
        }
});

// routerSrv.get ('/api/todoitems/:id/todostatus', async (request, response) => {
routerSrv.get ('/:todoId/todostatus', async (request, response) => {
    const todoObjectId = request.params.todoId;

    console.log( `${'-'.repeat(40)}  .get() PATH = '/api/:todoId/todostatus'     params = ${JSON.stringify(request.params)}     using _id :todoId = ${todoObjectId}`);

    const debugInfo = { "service":  "TodoItems.js",
                        "path":     "/api/:todoId/todostatus",
                        "method":   "GET",
                        "params":   request.params,
                        "mongoose": ".find( {  by todoId.ObjectID()  })",
                    }; 
    const data= await TodostatusModel
        .find( { "todoId": ObjectID.createFromHexString(todoObjectId)})
        .collation({ locale: "en", strength: 2 })
        .sort( [['changeDate', 'desc']])
        .exec();
        response.json ({
            debugInfo,
            "status": {
                "success":      true,
                "numberOfRows": data.length,
            },   
            "data": data,
    });    
});


module.exports = routerSrv;
