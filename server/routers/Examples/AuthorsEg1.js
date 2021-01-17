const expressSrv = require ('express');
const authorsEg1Router = expressSrv.Router();
const {ObjectID} = require('mongodb');

// DB Schema to access collection todogroups
const {AuthorModel} = require ('../../models/authors-eg1.models');

// I do not need the schema of the Stories: it is handled via the pointer in Authors Schema
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

// get by name
module.exports = authorsEg1Router; 