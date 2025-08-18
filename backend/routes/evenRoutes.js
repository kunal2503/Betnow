const express = require("express");
const {isAuthenticateUser,isAdmin} = require("../middlewares/authMiddleware")
const{addEvent, editEvent, getAllEvent,getEventDetails, deleteEvent, declareResult} = require("../controllers/eventControllers")

const router = express.Router();

router.get("/event/all-events",isAuthenticateUser,getAllEvent);
router.get("/event/:id",isAuthenticateUser,getEventDetails);
router.post("/event/add-event",isAuthenticateUser,isAdmin,addEvent);
router.post("/event/edit-event",isAuthenticateUser,isAdmin,editEvent);
router.post("/event/declare-result/:eventId",isAuthenticateUser,isAdmin,declareResult)
router.delete("/event/delete-event/:eventId",isAuthenticateUser,isAdmin,deleteEvent)

module.exports = router;