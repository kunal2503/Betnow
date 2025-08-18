const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.signup = async (req,res) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message : "All fields are required"});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)


        const newUser = new User({
            username : username,
            email : email,
            password : hashedPassword
        });
         
        await newUser.save();

        const token = jwt.sign({id : newUser._id},"ontheway",{expiresIn : "1d"});
        
        res.status(200).json({user : {id : newUser._id,username : newUser.username, email: newUser.email, profileImage : newUser.profileImage } , token });
    } catch(error){
        res.status(500).json({ message : "Internal server error"});
    }
}

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "Something missing"});
        }
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(404).json({message : "User not exit"});
        }
        const passwordNotMatch = await bcrypt.compare(password,userExists.password);
        if(!passwordNotMatch){
            return res.status(400).json({message : "Invaild Credentials"});
        };
        const token = await jwt.sign({id: userExists._id},process.env.JWT_SECRET,{expiresIn : "1d"});
        res.status(200).json({user : {id : userExists._id,username : userExists.username, email: userExists.email } , token })
    }catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"});
    }
}

exports.forget_password = async (req,res) => {
    try{
        const {email,new_password,confirm_password} = req.body;
        if(!email || !new_password || !confirm_password){
            return res.status(400).json({message : "Enter valid data"});
        }
        const userExists = await User.findOne({email})
        if(!userExists) {
            return res.status(404).json({message : "User not found"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(confirm_password,salt)

        console.log(userExists.password,hashedPassword)
        if(userExists.password === hashedPassword){
            return res.status(400).json({message : "New password cannot be same as old password"});
        }
        
        await userExists.updateOne({email},{$set: {password : hashedPassword}})

        const token = jwt.sign({id:userExists._id},"ontheway",{expiresIn : "1d"});

        res.status(200).json({user : {id : userExists._id,username : userExists.username, email: userExists.email, profileImage: userExists.profileImage } , token })
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}

