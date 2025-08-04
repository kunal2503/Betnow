import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { MdClose } from 'react-icons/md';

const AddProfile = ({userId,setOpenEditPreview}) => {
    const [file, setFile] = useState(null);

    const handleFileUpload = async(e) =>{
        e.preventDefault();
        try{

          if(!file){
            console.error("No file selected");  
        }
        // Create a FormData object to send the file
        const formData = new FormData()
        // Append the file to the FormData object
        formData.append("image", file);
        setOpenEditPreview(false);
        const response = await  axiosInstance.post(`/api/profile/update-profile/${userId}`,formData, {headers:{
          "Content-Type" : "multipart/form-data"
        }});
      } catch(error){
        console.error("Error uploading file:",error);
        // res.status(500).json({message : "Internal server error"});
      }
        
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-50">
  <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 flex flex-col items-center gap-6">
    <MdClose onClick={()=> setOpenEditPreview(false)}/>
    <h1 className="text-xl font-semibold">Add Profile Picture</h1>
    
    <form
      className="flex flex-col items-center gap-4 w-full"
      encType="multipart/form-data"
    >
      <div className="flex flex-col w-full">
        <label
          className="text-sm font-light mb-1 text-left"
          htmlFor="addImage"
        >
          Select
        </label>
        <input
          type="file"
          id="addImage"
          onChange={(e) => setFile(e.target.files[0])}
          name="image"
          className="border px-2 py-1 rounded-md text-sm w-full"
        />
      </div>

      <button
        type="button"
        onClick={handleFileUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>
  </div>
</div>

  )
}

export default AddProfile