const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const competitionSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    date : {
        type: Date,
        required : true
    },
    link :{

    },
    deadline :{
        type: String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    idSecret: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Competition', competitionSchema)