const expressSrv = require ('express');
const routerSrvUsers = expressSrv.Router();
const {ObjectID} = require('mongodb');
const mongooseSrv = require('mongoose');
// DB Schema for collection "users"
const {UserModel} = require('../../models/users.models');

routerSrvUsers.get ('/', async (request, response, next) => {
    console.log(`====>>>>> Server  usersRouter.get(/)`);

    try {
        const userData = await UserModel 
            .find()
            .exec()
            response.json (userData);
            console.log (`................Server:   /api/users documents.Count = ${userData.length}`)
    } catch (err) {
        console.log(`ERROR Server Side. userRouter.get(/)`)
        next(err);
    }
});


routerSrvUsers.get ('/getDataByParm', async (request, response, next) => {
    let reqParams={};
    let loginName=request.body.loginName;
    let userType=request.body.userType;
    if (loginName==='GUEST' && userType==='GUEST') {
        request.body.loginName='visitorAsGuest#909';
    } else if (loginName==='ADMIN' && userType==='ADMIN') {
        request.body.loginName='visitorAsAdmi#808'
    }

    
    
    console.log(`====>>>>> Server  usersRouter.get(/getDataByParm)`);
    // console.log(`====>>>>> Server  getDataByParm: I need to check which param qas passed in the query, not in the params)`);
    console.log(`====>>>>> Server  getDataByParm: request.body : )`, request.body);

    // request.params.loginName
    // request.query.loginName
    // request.body

    try {
        const userData = await UserModel 
            // if I pass in the body the correct field names --> query will return all if body = {} OR apply filet if body has content
            .find( request.body )
            .exec()
            response.json (userData);
            console.log (`................Server:   /api/users/getDataByParm documents.Count = ${userData.length}`)
    } catch (err) {
        console.log(`ERROR Server Side. userRouter.get(/)`)
        next(err);
    }
});


routerSrvUsers.post ('/', async (request, response, next) => {
    const currentDateTime = new Date();
    const newObjectID = mongooseSrv.Types.ObjectId();

    console.log(`====>>>>> Server  usersRouter.post(/)`);
    console.log(`....................parameters: `, request.body, '   addig _id in post');

    let newData = request.body; // , "_id": newObjectID}
    newData ["_id"] = newObjectID;
    
    try {
        const userData = await UserModel
            .insertMany ( newData );
            // .exec()
        response.json ({"newRecordData": userData});
    } catch (err) {
        console.log(`====>>>>> Server  ERROR  !!  usersRouter.post(/)`);
        next(err);
    }
});

module.exports = routerSrvUsers;