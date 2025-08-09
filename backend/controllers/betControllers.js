const Bet = require("../model/bets");
const User = require("../model/user");
const Event = require("../model/event");
const Transtiion = require("../model/transitions");
const { priceChanger } = require("../utility/priceChangeing");
const mongoose = require("mongoose");

exports.placeBet = async (req, res) => {
  try {
    const { userId, eventId, quantity, betSide } = req.body;
    if (!userId || !eventId || !quantity || !betSide) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (quantity <= 0) {
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

    if (betSide === "yes") {
      priceAtPlaceBet = event.yesPrice;
      betPrice = event.yesPrice * quantity;
    } else {
      priceAtPlaceBet = event.noPrice;
      betPrice = event.noPrice * quantity;
    }

    //Check user balance 
    if (user.wallet < betPrice) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    let bet = await Bet.findOne({ eventId, userId, betSide });

    if(bet && bet.status === "completed"){
      return res.status(400).json({message : "Already sold"});
    }

    if (bet && bet.status === "live") {
      bet.quantity += quantity;
      bet.amount += betPrice;
    }else {
      bet = new Bet({
        userId: user._id,
        eventId: event._id,
        eventName: event.title,
        betSide: betSide,
        amount: betPrice,
        priceAtPlaceBet: priceAtPlaceBet,
        quantity: quantity,
        status : "live"
      });
    }

    user.wallet -= betPrice;

    if (betSide === "yes") {
      event.totalYesQuantity += quantity;
      event.totalYesAmount += betPrice;
    } else {
      event.totalNoQuantity += quantity;
      event.totalNoAmount += betPrice;
    }
     
    await Promise.all([bet.save(), user.save(), event.save()]);
    
    res.status(200).json({ message: "Order sold successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Bet.find({ userId: userId });
    res.status(200).json({ orders: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.sellBet = async (req, res) => {
  try {
    const betId = req.params.betId;
    const bet = await Bet.findById(betId);
     if ( !bet) {
      return res
        .status(404)
        .json({ message: "user or event not Found" });
    }
    const user = await User.findById(bet.userId);
    const event = await Event.findById(bet.eventId);
    if ( !user || !event) {
      return res
        .status(404)
        .json({ message: "user or event not Found" });
    }

    if (bet.status !== "live") {
      return res.status(400).json({ message: "Bet Already sold" });
    }

    if (bet.betSide === "yes") {
      event.totalYesAmount = Math.max(0,event.totalYesAmount - bet.amount);
      event.totalYesQuantity = Math.max(0,event.totalYesAmount - bet.quantity);
    } else {
       event.totalNoAmount = Math.max(0,event.totalNoAmount - bet.amount);
      event.totalNoQuantity = Math.max(0,event.totalNoAmount - bet.quantity);
    }

    user.wallet += bet.amount;

    bet.status = "completed";

    await Promise.all([bet.save(), event.save(), user.save()]);

    res.status(200).json({ message: "Order sell successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
