const express = require("express");
const multer = require("multer");

// const cloudinary = require("cloudinary").v2;
const User = require("../model/user");
const {getUserInfo, updateProfilePicture} = require("../controllers/userControllers")

// const upload = multer({ dest: "uploads/"});
const upload = multer({ storage : multer.memoryStorage()})

const router = express.Router();


router.post("/get-user-info/:id",getUserInfo);
router.post("/update-profile/:id", upload.single("image") ,updateProfilePicture);


module.exports = router;