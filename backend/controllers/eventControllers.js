const Event = require("../model/event");



exports.addEvent = async (req,res) =>{
    try{
        const {category,question, createdBy} = req.body;
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
exports.deleteEvent = async (req,res) =>{
    try{

    } catch(error){
        res.status(500).json({message :  "Internal server error"})
    }
}