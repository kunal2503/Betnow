const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required :  true,
        unique : true
    },
    profileImage : {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/9069/9069049.png"
    },
    role : {
        type : String,
        default : "user",
        enum : ["user","admin"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    wallet : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true});

module.exports = mongoose.model("user",userSchema);