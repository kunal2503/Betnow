const Bet = require("../model/bets");
const User = require("../model/user");
const Event = require("../model/event");
const Wallet = require("../model/wallet");
const Transition = require("../model/transitions");
const BetHistory = require("../model/betHistory");
const mongoose = require("mongoose");


exports.getBet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Bet.find({ userId: userId });
    res.status(200).json({ orders: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getBetSellAndBuyHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await BetHistory.find({ userId: userId });
    res.status(200).json({ orders: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.placeBet = async (req, res) => {
  try {
    const { userId, eventId, quantity, betSide } = req.body;
    if (!userId || !eventId || !quantity || !betSide) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity greater than 1" });
    }

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);
    if (!user || !event) {
      return res.status(404).json({ message: "Not Found" });
    }
    let betPrice = 0,priceAtPlaceBet = 0;
    
    if (event.status !== "live" ) {
      return res.status(400).json({ message: "Event closed" });
    }

    const walletExist = await Wallet.findOne({userId : user._id});
    if(!walletExist){
      return res.status(404).json({message : "User wallet not Created"});
    }

    if (betSide === "yes") {
      priceAtPlaceBet = event.yesPrice;
      betPrice = event.yesPrice * quantity;
    } else {
      priceAtPlaceBet = event.noPrice;
      betPrice = event.noPrice * quantity;
    }

    //Check user balance 
    if (walletExist.balance < betPrice) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    let activeBet = await Bet.findOne({ eventId, userId, betSide });

    if (activeBet) {
      activeBet.quantity += quantity;
      activeBet.amount += betPrice;
    }else  {
      activeBet = new Bet({
        userId: user._id,
        eventId: event._id,
        eventName: event.title,
        betSide: betSide,
        amount: betPrice,
        priceAtPlaceBet: priceAtPlaceBet,
        quantity: quantity,
        result : "pending"
      });
    }

    if (betSide === "yes") {
      event.totalYesQuantity += quantity;
      event.totalYesAmount += betPrice;
    } else {
      event.totalNoQuantity += quantity;
      event.totalNoAmount += betPrice;
    }

    //transitions and bethistory
    const betHistory = new BetHistory({
      betId: activeBet._id,
      eventId : event._id,
      userId : user._id,
      eventName : event.title,
      betSide : betSide,
      amount : betPrice,
      quantity : quantity,
      type : "buy",
      priceAtPlaceOrder : betPrice,
    })
    // transitions 
    const newTransition = new Transition({
      betId : activeBet._id,
      userId : user._id,
      type : "internalDebit",
      amount : betPrice,
      status  : "successfull"
    })

    walletExist.balance -= betPrice;
     console.log(activeBet);
    await Promise.all([activeBet.save(), user.save(), event.save(),walletExist.save(),newTransition.save(),betHistory.save()]);
    
    res.status(200).json({ message: "Order sold successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.sellBet = async (req, res) => {
  try {
    const betId = req.params.betId;
    const bet = await Bet.findById(betId);
     if ( !bet) {
      return res.status(404).json({ message: "Bet Not Found" });
    }
    const user = await User.findById(bet.userId);
    const event = await Event.findById(bet.eventId);
    if ( !user || !event) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (bet.quantity === 0) {
      return res.status(400).json({ message: "Bet Already sold" });
    }

    const userWallet = await Wallet.findOne({userId : user._id});
    if(!userWallet){
      return res.status(404).json({message : "User wallet not Created"});
    }


    if (bet.betSide === "yes") {
      event.totalYesAmount = Math.max(0,event.totalYesAmount - bet.amount);
      event.totalYesQuantity = Math.max(0,event.totalYesAmount - bet.quantity);
    } else {
       event.totalNoAmount = Math.max(0,event.totalNoAmount - bet.amount);
      event.totalNoQuantity = Math.max(0,event.totalNoAmount - bet.quantity);
    }

    
    // const transition = new Transition
    const betHistory = new BetHistory({
      betId: bet._id,
      eventId : event._id,
      userId : user._id,
      eventName : event.title,
      betSide : bet.betSide,
      amount : bet.amount,
      quantity : bet.quantity,
      type : "sell",
      priceAtPlaceOrder : bet.amount,
    })
    // transitions 
    const newTransition = new Transition({
      betId : bet._id,
      userId : user._id,
      type : "internalCredit",
      amount : bet.amount,
      status  : "successfull"
    })

    userWallet.balance += bet.amount;
    bet.quantity = 0;


    await Promise.all([bet.save(), event.save(), user.save(),userWallet.save(),newTransition.save(),betHistory.save()]);

    res.status(200).json({ message: "Order sell successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

