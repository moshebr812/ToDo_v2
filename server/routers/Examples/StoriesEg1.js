const expressSrv = require ('express');
const stroiesEg1Router = expressSrv.Router();
const {ObjectID} = require('mongodb');

// DB Schema to access collection todogroups
const {AuthorModel} = require ('../../models/authors-eg1.models');
const {StoryModule} = require ('../../models/stories-eg1.models');




stroiesEg1Router.get ('/', async (request, response, next) => {
    console.log (`=====>>>>>>>   Server: examples: stroiesEg1Router.get ('/')`);

    try {
        const data = await StoryModule
            .find()
            .populate ('author', 'name')
            .exec()
        response.json (data);
    } 
    catch (e) {
        console.log (`Server --> error at stroiesEg1Router.get('/')` );
        next(e);
    }
});

stroiesEg1Router.get ('/:_id', async (request, response, next) => {
    const story_id = ObjectID (request.params._id);
    console.log (`=====>>>>>>>   Server: examples: stroiesEg1Router.get ('/_id')  _id=${story_id}`);

    try {
        const data = await StoryModule
            .find({_id: story_id})
            .exec()
        response.json (data);
    } 
    catch (e) {
        console.log (`error at stroiesEg1Router.get('/_id')` );
        next(e);
    }
});

module.exports = stroiesEg1Router; 