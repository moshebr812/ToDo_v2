const { request, response } = require("express")

const expressSrv = require ('express');
const todogroupsRouter = expressSrv.Router();
const {ObjectID} = require('mongodb');

// DB Schema to access collection todogroups
const {TodogroupModel} = require ('../../models/todogroups.models');
const {TodoitemModel} = require ('../../models/todoitems.models');


// GET for all groups
todogroupsRouter.get ('/', async (request, response, next) => {
    console.log (`=====>>>>>>>   Server: todogroupsRouter.get ('/')`);

    try {
        const data = Data = await TodogroupModel
            .find()
            .populate('TodogroupTemplateModel')
            .exec()
        // .insertMany (request.body)
        // return the new record after insert
        response.json (data);
    } 
    catch (e) {
        console.log ('error at todogroupRouter.get('/')' );
        next(e);
    }
});

todogroupsRouter.get('/checkIsGroupInUse/:groupId' , async (request, response, next) => {
    const idToCheck = request.params.groupId;
    console.log (`====>>>> Server: todogroup API .get(checkIsGroupInUse/:groupId)  param: ${request.params.groupId}`);
    const countInUse = await TodoitemModel
        .count ( {"groupId": ObjectID(idToCheck)})

    response.json ( { 'debug': 'check if groupId is in use via .count()',
                      'countInUse': countInUse } );
});

todogroupsRouter.post ('/' , async (request, response, next) => {
    console.log (`====>>>> Server: todogroup API .post()  body=${JSON.stringify( request.body ) }`)
    try {
        const newRecord = await TodogroupModel
            .insertMany (request.body)
            response.json ({"newRecord": newRecord})

    } catch (e) {
        console.log('Server: failed todogroup.post(). err=',e);
        next (e);
    }
})

module.exports = todogroupsRouter; 