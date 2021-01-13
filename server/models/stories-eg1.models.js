// // PROJECT:     TOTO_V1
// // FILE:        todostatus.models.js

const { Schema, model } = require ('mongoose');
const { ObjectID } = require ('mongodb');
const { AuthorModel } = require ('./authors-eg1.models');

const storiesSchema = Schema ({
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'AuthorModel',
    // },
    _id:   {
        type:       ObjectID,
        required:   true,      // let mongodb generate it
    },
    storyTitle: {               // human number
        type: String,
        required: true,
    },
    population: {                   // pointer to todoitems._id
        type:       String,
        required:   false,
    },
    translatedLanguages: [{
        type: String,
        required: false,
    }]
}, 
)
const StoryModule = model('Storie' , storiesSchema);

module.exports = {
    StoryModule,
}