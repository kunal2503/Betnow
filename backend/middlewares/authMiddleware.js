const jwt = require("jsonwebtoken")
const User = require("../model/user");

exports.isAuthenticateUser =  async (req,res,next)=>{
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith("Bearer ")){
        return res.status(401).json({message : "Access denied"});
    }
    const token = authHeaders.split(" ")[1];
    // console.log(token)
    
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded)
        req.user = decoded;
        
        next();
    } catch(error){
        res.status(401).json({message : "Token is not valid"});
    }
}


exports.isAdmin = async(req,res,next)=>{
    try{
        const user = await User.findById({_id : req.user.id});
        
        if(user.role !== "admin"){
            return res.status(401).json({message : "Accessn denied  only admin can Access"});
        }
        next();
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}