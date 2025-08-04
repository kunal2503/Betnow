const cloudinary  = require("cloudinary").v2;

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUDE_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

// Function to upload an image to Cloudinary
// const uploadImage = async (file) => {
//     try{
//         const result = await cloudinary.uploader.upload(file,{
//             folder: "option_betting_profile_images", // Specify the folder in Cloudinary
//             use_filename: true, // Use the original file name

//         });
//         return result.secure_url; // Return the secure URL of the uploaded image

//     } catch(error){
//         console.error("Error uploading image to Cloudinary:", error);
//         throw new Error("Image upload failed");
//     }
// }

// Function to delete an image from Cloudinary
// const deleteImage = async (publicId) => {
//     try{
//         await cloudinary.uploader.destroy(publicId);
//     } catch(error){
//         console.error("Error deleting image from Cloudinary:", error);
//         throw new Error("Image deletion failed");
//     }
// }



module.exports = {cloudinary};