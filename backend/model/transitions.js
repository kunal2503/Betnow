const mongoose = require("mongoose");

const transitionSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    betId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "bet",
        required : true
    },
    type : {
        type : String,
        required : true,
        enum: ["credit","deposit"]
    },
    amount : {
        type : Number,
        required : true,
        min : 0 
    },
    status : {
        type : String,
        required : true,
        enum : ["pending", "successfull", "failed", "cancelled" ]
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("transition",transitionSchema);