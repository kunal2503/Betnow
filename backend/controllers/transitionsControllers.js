const User = require("../model/user");
const Wallet = require("../model/wallet");
const Transition = require("../model/transitions");

exports.history = async(req,res) =>{
    try{
        const {id}  =  req.params;
        
        const user = await User.findOne({_id : id});
        if(!user){
            return  res.status(404).json({message : "User not Found"})
        }
        const transitionsHistory = await Transition.find({userId : user._id})
        if(!transitionsHistory){
          return res.status(404).json({message : "History not found"})
        }

        res.status(200).json({history : transitionsHistory})
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}

exports.checkAccountBalance = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User id Is required" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const wallet = await Wallet.findOne({ userId: userId });
    if (!wallet) {
      return res.status(404).json({ message: "Something wents wrong" });
    }
    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addBalance = async (req, res) => {
  try {
    const { userId, balance } = req.body;

    console.log(userId)
    if (!userId || !balance) {
      return res.status(400).json("user id and Balance required");
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let wallet = await Wallet.findOne({ userId: user._id });

    if (wallet) {
        wallet.balance += Number(balance);
    }else{
        wallet = new Wallet({
        userId: user._id,
        balance: Number(balance),
      });
    }
    
    
    const newTransition = new Transition({
      userId: user._id,
      type: "deposit",
      amount: balance,
      status: "successfull",
    });

    await newTransition.save();
    await wallet.save();
    res.status(200).json({ message: "Amount added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
