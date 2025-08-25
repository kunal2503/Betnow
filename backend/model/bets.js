const mongoose = require("mongoose");

const betsSchema =  new mongoose.Schema({
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
        default : 0
    },
    amount : {
        type : Number,
        required :  true,
        min: [0.5, "Amount must be at least 1"]
    },
    priceAtPlaceBet : {
        type : Number,
        required : true
    },
    profitAndLoss : {
        type :  Number,
        default : 0
    },
    result : {
        type : String,
        default : "pending",
        enum : ["pending","win","loss","cancelled"],
        lowerCase : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    isActive : {
        type : Boolean,
        default : true
    }
},{timestamps : true});


module.exports =  mongoose.model("bet", betsSchema);