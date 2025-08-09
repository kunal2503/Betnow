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
        min: [1, "Quantity must be at least 1"]
    },
    amount : {
        type : Number,
        required :  true,
        min: [1, "Amount must be at least 1"]
    },
    priceAtPlaceBet : {
        type : Number,
        required : true
    },
    status: {
      type: String,
      default: "live",
      enum: ["live", "completed", "cancelled"],
      lowerCase : true
    },
    result : {
        type : String,
        default : "in-progress",
        enum : ["in-progress","yeswin","nowin","cancelled"],
        lowerCase : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },

},{timestamps : true});


module.exports =  mongoose.model("bets", betsSchema);