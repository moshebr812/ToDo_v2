// // PROJECT:     TOTO_V1
// // FILE:        todostatus.models.js

//
// import AuthorModel from './authors-eg1.models';
// const { AuthorModel } = require('./authors-eg1.models');
const { Schema, model } = require ('mongoose');
const { ObjectID } = require ('mongodb');


const storiesSchema = Schema ({
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
    // author: { type: Schema.Types.ObjectId, ref: AuthorModel },
    // abc: {
    //     type: Schema.Types.ObjectId,
    //     // with out the string it fails on:
    //     // "Models ref each other error: circular dependencies problem"
    //     ref: AuthorModel
    // },
    translatedLanguages: [{
        type: String,
        required: false,
    }],

}, 
)
const StoryModule = model('Storie' , storiesSchema);

module.exports = {
    StoryModule,
}