const express = require("express");
const{addEvent, editEvent, deleteEvent, getAllEvent,getEventDetails} = require("../controllers/eventControllers")

const router = express.Router();

router.get("/event/all-events",getAllEvent);
router.get("/event/:id",getEventDetails);
router.post("/event/add-event",addEvent);
router.post("/event/edit-event",editEvent);
router.delete("/event/delete-event",deleteEvent);

module.exports = router;