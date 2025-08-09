const express = require("express");
const { placeBet,getBet, sellBet} = require("../controllers/betControllers");


const router =  express.Router();

router.get("/get-bet-orders/:userId",getBet);
router.post("/place-bet",placeBet);
router.post("/sell-bet/:betId",sellBet);

module.exports = router;