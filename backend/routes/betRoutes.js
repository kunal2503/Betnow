const express = require("express");
const {setBet} = require("../controllers/betControllers")

const router =  express.Router();

router.post("/:eventId",setBet);

module.exports = router;