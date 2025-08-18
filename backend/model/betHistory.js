const mongoose = require("mongoose");

const betsSchemaHistory =  new mongoose.Schema({
    betId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "bet",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true,
        index: true
    },
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "event",
        required : true,
        index: true
    },
    eventName:{
        type : String,
        required:true,
        trim : true
    },
    betSide : {
        type : String,
        required : true,
        enum : ["yes","no"],
        lowerCase : true
    },
    quantity : {
        type: Number,
        required: true,
    },
    amount : {
        type : Number,
        required :  true,
        min: [1, "Amount must be at least 1"]
    },
    priceAtPlaceOrder : {
        type : Number,
        required : true
    },
    result : {
        type : String,
        default : "in-progress",
        enum : ["in-progress","yeswin","nowin","cancelled"],
        lowerCase : true
    },
    closeAt : {
        type : Date,
        default : Date.now
    },
    type:{
        type : String,
        enum : ["sell","buy"],
        required: true
    }

},{timestamps : true});


module.exports =  mongoose.model("betHistory", betsSchemaHistory);