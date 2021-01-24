const expressSrv = require ('express');
const routerUserFeedback = expressSrv.Router();
const {ObjectID} = require('mongodb');
const mongooseSrv = require('mongoose');
// DB Schema for collection "users"
const {UserFeedbackModel} = require('../../models/users.feedback.models');

routerUserFeedback.get ('/', async (request, response, next) => {
    console.log(`====>>>>> Server  routerUserFeedback.get(/)`);

    try {
        const feedbackData = await UserFeedbackModel 
            .find()
            .exec()
            response.json (feedbackData);
            console.log (`................Server:   /api/userfeedback documents.Count = ${feedbackData.length}`)
    } catch (err) {
        console.log(`ERROR Server Side. userfeedback.get(/)`)
        next(err);
    }
});

routerUserFeedback.post ('/', async (request, response, next) => {
    let newData = request.body;

    console.log(`====>>>>> Server  routerUserFeedback.post(/)`);
    console.log(`request.body - before`, newData);
    newData['_id'] = mongooseSrv.Types.ObjectId();
    
    if (request.body.insertDate) {
        // We want to calc the duration user "devoted to fill out the form"
        // console.log ('Server Date:' , new Date());
        // console.log ('Server, insert date from client:', request.body.insertDate );
        let secDiff = parseInt ( ( (new Date()) - new Date(request.body.insertDate) ) /1000 );
        console.log (`routerUserFeedback.post. Feedback form opened for (${secDiff})seconds `);
        newData['engagementDuration']=secDiff;
    }

    console.log(`newData - after adding _id, engagementDuration`, newData);
    try {
        const feedbackData = await UserFeedbackModel 
            .insertMany(newData)
            // .exec()
            response.json (feedbackData);
            // console.log (`................Server:   /api/userfeedback documents.Count = ${feedbackData.length}`)
    } catch (err) {
        console.log(`ERROR Server Side. userfeedback.post(/)`)
        next(err);
    }
});

routerUserFeedback.delete('/', async (request, response, next) => {
    console.log (`Server ---------->>>   routerUserFeedback.delete `);
    const delResponse = await UserFeedbackModel
        .deleteMany (request.body)
        .exec()

    response.json ({"delete Resonse": delResponse});
});
// routerSrvUsers.get ('/getDataByParm', async (request, response, next) => {

    
//     console.log(`====>>>>> Server  usersRouter.get(/getDataByParm)`);
//     // console.log(`====>>>>> Server  getDataByParm: I need to check which param qas passed in the query, not in the params)`);
//     console.log(`====>>>>> Server  getDataByParm: request.body : )`, request.body);

//     // request.params.loginName
//     // request.query.loginName
//     // request.body

//     try {
//         const userData = await UserModel 
//             // if I pass in the body the correct field names --> query will return all if body = {} OR apply filet if body has content
//             .find( request.body )
//             .exec()
//             response.json (userData);
//             console.log (`................Server:   /api/users/getDataByParm documents.Count = ${userData.length}`)
//     } catch (err) {
//         console.log(`ERROR Server Side. userRouter.get(/)`)
//         next(err);
//     }
// });


// routerSrvUsers.post ('/', async (request, response, next) => {
//     const currentDateTime = new Date();
//     const newObjectID = mongooseSrv.Types.ObjectId();

//     console.log(`====>>>>> Server  usersRouter.post(/)`);
//     console.log(`....................parameters: `, request.body, '   addig _id in post');

//     let newData = request.body; // , "_id": newObjectID}
//     newData ["_id"] = newObjectID;
    
//     try {
//         const userData = await UserModel
//             .insertMany ( newData );
//             // .exec()
//         response.json ({"newRecordData": userData});
//     } catch (err) {
//         console.log(`====>>>>> Server  ERROR  !!  usersRouter.post(/)`);
//         next(err);
//     }
// });

module.exports = routerUserFeedback;