const Event = require("../model/event");
const Bet = require("../model/bets");
const Transition = require("../model/transitions");
const Wallet = require("../model/wallet");

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

exports.winnersPayments = async(winningSide,betData) =>{
    try{
      for(let bet of betData) {
        if(bet.betSide === winningSide){
          
        } else{
          
        }
      }

    } catch(error){
      throw error;
    }
}

exports.refundPaymentsSettlement = async(betData)=>{
  try{  
      for(let bet of betData){
        const payout = bet.quantity * bet.priceAtPlaceBet;
        console.log(payout,bet);
        
        bet.isActive = false;
        bet.result = "cancelled";
        await bet.save();

        const creditToUserAccount = await Wallet.updateOne({userId  : bet.userId}, {$inc : {balance : payout}});
        const cancelledTransition = await Transition.create({
          type : "refund",
          betId : bet._id,
          userId : bet.userId,
          amount : payout,
          status : "successfull"
        });
      await creditToUserAccount.save();
      await cancelledTransition.save();

        return { success  : true};
      }
  } catch(error){
    throw error;
  }
}