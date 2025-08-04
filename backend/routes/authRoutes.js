const express = require("express");
const User = require("../model/user");
const { signup, login, forget_password } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);
router.post("/forget-password", forget_password);


module.exports = router;