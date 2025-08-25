const Event = require("../model/event");
const Bet = require("../model/bets");
const Transition = require("../model/transitions");
const Wallet = require("../model/wallet");
const BetHistory = require("../model/betHistory");

exports.paymentDeletedEventRefund = async (eventId) => {
  try {
    const bets = await Bet.find({ eventId: eventId });

    for (const bet of bets) {
      const payout = bet.quantity * bet.priceAtPlaceBet;

      bet.isActive = false;
      bet.result = "cancelled";
      await bet.save();

      const creditRepay = await Wallet.updateOne(
        { userId: bet.userId },
        { $inc: { balance: payout } }
      );
      const repay = await Transition.create({
        type: "refund",
        userId: bet.userId,
        betId: bet._id,
        amount: payout,
        status: "successfull",
      });
    }
    return { success: true };
  } catch (error) {
    throw error;
  }
};

exports.winnersPayments = async (winningSide, betData, event) => {
  try {
    for (let bet of betData) {
      let payout = bet.quantity * event[`${winningSide}Price`];
      let buyPrice = bet.quantity * bet.priceAtPlaceBet;

      if (winningSide !== bet.betSide) {
        bet.isActive = false;
        bet.result = "loss";
        bet.profitAndLoss = buyPrice;
        bet.amount = 1;
        await bet.save();
      } else {
        bet.isActive = false;
        bet.result = "win";
        bet.profitAndLoss = payout - buyPrice;
        bet.amount = payout;
        await bet.save();

        const creditWinningAmount = await Wallet.updateOne(
          { userId: bet.userid },
          { $inc: { balance: payout } }
        );
        
        const creditWinningTransition = await Transition.create({
          type: "internalCredit",
          betId: bet._id,
          userId: bet.userId,
          amount: payout,
          status: "successfull",
        });
      }

      const betHistory = new BetHistory({
        betId: bet._id,
        eventId: event._id,
        userId: bet.userId,
        eventName: event.title,
        betSide: bet.betSide,
        amount: bet.amount,
        quantity: bet.quantity,
        result: bet.result,
        type: "result",
        priceAtPlaceOrder: bet.priceAtPlaceBet,
      });
      betHistory.save();
      console.log(bet, betHistory);
    }
    return { success: true };
  } catch (error) {
    throw error;
  }
};

exports.refundPaymentsSettlement = async (betData) => {
  try {
    for (let bet of betData) {
      const payout = bet.quantity * bet.priceAtPlaceBet;
      console.log(payout, bet);

      bet.isActive = false;
      bet.result = "cancelled";
      await bet.save();

      const creditRepay = await Wallet.updateOne(
        { userId: bet.userId },
        { $inc: { balance: payout } }
      );
      const repay = await Transition.create({
        type: "refund",
        userId: bet.userId,
        betId: bet._id,
        amount: payout,
        status: "successfull",
      });
    }
    return { success: true };
  } catch (error) {
    throw error;
  }
};
