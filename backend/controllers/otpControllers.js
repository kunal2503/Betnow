const Otp = require("../model/otp");
const User = require("../model/user")
const nodeMailer = require("nodemailer");


exports.sendOtp = async (req,res) =>{
    try{
       if(!req.body.email){
        return res.status(400).json({message : "Email is required"});
       };
       const userExists = await User.findOne({email : req.body.email}).select("-password");
       if(!userExists){
        return res.status(404).json({message : "User not found"});
       };
       const otp = Math.floor(10000+Math.random()*90000);
       await Otp.create({
        email : userExists.email,
        otp : otp
       });
       console.log("OTP sent to user:", userExists.email, "OTP:", otp, process.env.EMAIL, process.env.PASSWORD);
       const transporter = nodeMailer.createTransport({
        service : "gmail",
        auth : {
            user : "kunaldeshmukh07d@gmail.com",
            pass : "jkkwlsxnjsywehxh"
        }
       })
         const mailOptions = {
            from : "kunaldeshmukh07d@gmail.com",
            to : userExists.email,
            subject : "OTP for Password Resent",
            html : `Hi ${userExists.username},<br> Your OTP for password reset is <b>${otp}</b>. This OTP is valid for 5 minutes. Please do not share it with anyone. <br> Thank you! <br> BetNow . `
         };
         transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.error("Error sending email:", error);
                return res.status(500).json({message : "Error sending email"});
            } 
             else {
                return res.status(200).json({message : "OTP sent successfully"})
            }
         })
    } catch(error){
        res.status(500).json({message :  "Internal server error"});
    }
}

exports.verifyOtp = async (req,res) =>{
    try{
        const {email,otp} = req.body
        if(!email || !otp){
            return res.status(400).json({message : "Email and OTP are required"});
        }
        const isOtpExists = await Otp.findOne({email : email , otp : otp})
        if(!isOtpExists){
            return res.status(404).json({message : "Invalid OTP"});
        }
        await Otp.findOneAndDelete({email : email});

        res.status(200).json({message : "Verify Successfuly"});
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }

}