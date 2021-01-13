const { request, response } = require("express")

const expressSrv = require ('express');
const authorsEg1Router = expressSrv.Router();
const {ObjectID} = require('mongodb');

// DB Schema to access collection todogroups
const {AuthorModel} = require ('../../models/authors-eg1.models');
const {StoryModule} = require ('../../models/stories-eg1.models');


authorsEg1Router.get ('/', async (request, response, next) => {
    console.log (`=====>>>>>>>   Server: examples: authorsRouter.get ('/')`);

    try {
        const data = await AuthorModel
            .find()
            //  to get all fields specify ONLY the field name in the module on which u wrote the word "ref"
            // .populate('stories')
            // to get only specific fields write on field "stories" with ref: "a name"
                    // 1st parameter is the field name in main schema.
                    // 2nd parameter is list of fields in the "ref" schema
            .populate('stories', 'storyTitle population')
            .exec()
        response.json (data);
    } 
    catch (e) {
        console.log (`error at authorsRouter.get('/')` );
        next(e);
    }
});


authorsEg1Router.get ('/storyEg1', async (request, response, next) => {
    console.log (`=====>>>>>>>   Server: examples: authorsRouter.get ('/storyEg1')`);

    try {
        const data = await StoryModule
            .find()
            .exec()
        response.json (data);
    } 
    catch (e) {
        console.log (`error at authorsRouter.get('/')` );
        next(e);
    }
});

authorsEg1Router.get ('/storyEg1/:_id', async (request, response, next) => {
    const story_id = ObjectID (request.params._id);
    console.log (`=====>>>>>>>   Server: examples: authorsRouter.get ('/storyEg1/_id')  _id=${story_id}`);

    try {
        const data = await StoryModule
            .find({_id: story_id})
            .exec()
        response.json (data);
    } 
    catch (e) {
        console.log (`error at authorsRouter.get('/')` );
        next(e);
    }
});

module.exports = authorsEg1Router; 