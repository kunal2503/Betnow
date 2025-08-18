const express = require("express");
const {addBalance,checkAccountBalance,history} = require("../controllers/transitionsControllers");
const { isAuthenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/check-balance/:id",isAuthenticateUser,checkAccountBalance)
router.get("/transitions-history/:id",isAuthenticateUser,history)
router.post("/add-balance/:id",isAuthenticateUser,addBalance)

module.exports = router;