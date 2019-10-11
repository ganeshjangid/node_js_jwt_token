const mongoose=require('mongoose');

//Define Schema

const Schema = mongoose.Schema;

const MovieSchema = new Schema({

    name:{
        type:String,
        trim:true,
        require:true
    },
    release_on:{
        type:Date,
        trim:true,
        require:true
    }
});

module.exports = mongoose.model('Movie',MovieSchema);
