const Bet = require("../model/bets");

exports.setBet = async(req,res) =>{
    try{
        console.log(req.body);
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}
