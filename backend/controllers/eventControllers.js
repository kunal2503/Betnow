const bets = require("../model/bets");
const Event = require("../model/event");
const { paymentDeletedEventRefund, winnersPayments, refundPaymentsSettlement } = require("../service/pamentsService");


exports.addEvent = async (req,res) =>{
    try{
        const {category,question, createdBy} = req.body;
        console.log(req.body)
        if(!category || !question || !createdBy){
            return res.status(400).json({message : "Something Messing"});
        }
        const newEvent = new Event({
            title : question,
            category : category,
            createdBy : createdBy,
            startTime : new Date()
        });
        await newEvent.save();

        res.status(200).json({message : "Event added successfully"});
    } catch(error){
        res.status(500).json({message :  "Internal server error"})
    }
}

exports.getAllEvent = async(req,res) =>{
    try{
        const response = await Event.find();
        // console.log(response)
        res.status(200).json({events : response})
    } catch(error){
        console.log(error);
        res.status(500).json({message : "Internal server error"});
    }
}
exports.getEventDetails = async (req,res) =>{
    try{

    } catch(error){
        res.status(500).json({message :  "Internal server error"})
    }
}

exports.editEvent = async (req,res) =>{
    try{

    } catch(error){
        res.status(500).json({message :  "Internal server error"})
    }
}
// Only admin can delete the created Event.
exports.deleteEvent = async(req,res) =>{
  try{
    const eventId = req.params.eventId;
    if(!eventId){
      return res.status(400).json({message : "Event id is required"});
    }
    const event = await Event.findOne({_id : eventId});
    if(!event){
      return res.status(404).json({message : "Event not found"});
    }
    await paymentDeletedEventRefund(event._id);
    await Event.findByIdAndDelete({_id: event._id});
    
    res.status(200).json({message : "Event Deleted and Payments Dones"});
  } catch(error){
    console.log(error)
    res.status(500).json({message : "Internal server error"});
  }
}

exports.declareResult = async(req,res) =>{
    try{
        const resultSide = req.body.result;
        const eventId = req.params.eventId;
        const event = await Event.findOne({_id : eventId});
        if(!event || event.status !== "live"){
            return res.status(400).json({message : "Event not exist or event closed"});
        }
        const betData =  await bets.find({eventId : event._id});
        if(!betData) {
            return res.status(404).jsoe({message : "Bet not Placed on this Event"});
        }
        if(resultSide.toLowerCase() === "cancelled"){
            await refundPaymentsSettlement(betData)
            event.status = "cancelled";
        }
        await winnersPayments(resultSide,betData,event);
        event.status = "completed";
        
        await event.save();
        return res.status(200).json({message : "Payment setteled"});
    } catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"});
    }
}