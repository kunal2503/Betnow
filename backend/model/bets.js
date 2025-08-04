const mongoose = require("mongoose");

const betsSchema =  new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true
    },
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "event",
        required : true
    },
    betSide : {
        type : String,
        required : true,
        enum : ["yes","no"],
    },
    quantity : {
        type: Number,
        required: true
    },
    amount : {
        type : Number,
        required :  true,
    },
    priceAtPlaceBet : {
        type : Number,
        required : true
    },
    result : {
        type : String,
        default : "pending",
        enum : ["pending", "yes", "no", "cancelled"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    },

},{timestamps : true});


module.exports =  mongoose.model("bets", betsSchema);