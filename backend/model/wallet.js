const  mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    balance : {
        type : Number ,
        default : 0
    }
})

module.exports = mongoose.model("walletSchema",walletSchema);