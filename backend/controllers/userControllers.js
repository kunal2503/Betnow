const User = require("../model/user");
const { cloudinary } = require("../config/cloudinary");

exports.getUserInfo = async (req, res)  =>{
    try{
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({message : "Id is Required" });
        }
        const userExist = await User.findOne({_id : id}).select("-password");
        console.log(id,userExist)
        if(!userExist){
            return res.status(404).json({message : "User not Found"});
        }
        res.status(200).json({user: userExist})
    } catch(error){
        console.error(error);
        res.status(500).json({message : "Internal server error"});
    }
}



// exports.getAllUserInfo = async (req, res)  =>{
//     try{
//         // const id = req.params.id;
//         // if(!id) {
//             // return res.status(400).json({message : "Id is Required"});
//         // }
//         const allUserInfo = await User.find().select("-password");
//         if(!allUserInfo){
//             return res.status(404).json({message : "Something went wrong"});
//         }
//         res.status(200).json({user: allUserInfo})
//     } catch(error){
//         res.status(500).json({message : "Internal server error"});
//     }
// }

// exports.deleteUser = async(req,res) => {
//     try{
//         const userId = req.params.id;
//         if(!userId){
//             return res.status(400).json({message : "Id is required"});
//         }
//         const deletedUser = await User.findByIdAndDelete({_id:userId});
//         res.status(200).json({message : "User Deleted successfully"});
//     } catch(error){
//         res.status(500).json({message : "Internal server error"});
//     }
// }

exports.updateProfilePicture = async (req, res) => {
    try{
        const userId = req.params.id // Extract userId from the URL
        console.log(req.file, userId);
        if(!req.file ){
            return res.status(400).json({message : "No file uploaded"});
        }
         if(!userId){
            return res.status(400).json({message : "user id is required"});
        }
        const userExits = await User.findOne({_id:userId});
        console.log(userExits)
        if(!userExits){
            return  res.status(404).json({message :  "User not Found"});
        }
        // upload the image to cloudinary
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject)=>{
                
            const stream = cloudinary.uploader.upload_stream({
                    folder : "option_betting_profile_images",
                    use_filename: true,}
            , (error, result) =>{
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            }
            );
            stream.end(req.file.buffer)
            
        })
    } 
        const result = await uploadToCloudinary();
        userExits.profileImage = result.secure_url;
        await userExits.save();
        res.status(200).json({message : "Image uploaded successfully"});
}  catch(error){
        console.log(error)
        res.status(500).json({message : "internal server error"});
    }
}