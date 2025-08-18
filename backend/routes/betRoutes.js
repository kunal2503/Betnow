const express = require("express");
const { placeBet,getBet, sellBet,getBetSellAndBuyHistory} = require("../controllers/betControllers");
const { isAuthenticateUser } = require("../middlewares/authMiddleware");


const router =  express.Router();

router.get("/bet-history/:userId",isAuthenticateUser,getBetSellAndBuyHistory);
router.get("/get-bet-orders/:userId",isAuthenticateUser,getBet);
router.post("/sell-bet/:betId",isAuthenticateUser,sellBet);
router.post("/place-bet",isAuthenticateUser, placeBet);


module.exports = router;