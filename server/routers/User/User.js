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


// We use post for read so we can pass the parameters in the body
routerSrvUsers.post ('/getDataByParams', async (request, response, next) => {
    let reqParams={};
    let loginName=request.body.loginName;
    let userType=request.body.userType;

    // If user will try to signIn with one of these "reserved" loginName-s the request.body will also 
    // include a password and the find ({}) will thus return 0 rows --> we are protected
    if (loginName==='GUEST' && userType==='GUEST') {
        request.body.loginName='visitorAsGuest#909';
    } else if (loginName==='ADMIN' && userType==='ADMIN') {
        request.body.loginName='visitorAsAdmin#808'
    } else if (loginName==='TECH' && userType==='TECH') {
        request.body.loginName='visitorAsTech#707'
    }
    
    
    console.log(`====>>>>> Server  usersRouter.post(/getDataByParams) - for validating loginName`);
    // console.log(`====>>>>> Server  getDataByParamms: request.body : )`, request.body);

    // request.params.loginName
    // request.query.loginName
    // request.body

    try {
        const userData = await UserModel 
            // if I pass in the body the correct field names --> query will return all if body = {} OR apply filet if body has content
            .find( request.body )
            .exec()
            response.json ({userInfo: userData, validUser: (userData.length>0?true:false) } );
            console.log (`................Server:   /api/users/getDataByParams as post documents.Count = ${userData.length}`)
    } catch (err) {
        console.log(`ERROR Server Side. userRouter.post(/getDataByParams)`)
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