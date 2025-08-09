import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddProfile = ({ userId, setOpenEditPreview }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        return toast.error("No file selected");
      }

      const formData = new FormData();
      formData.append("image", file);
      const response = await axiosInstance.post(
        `/api/profile/update-profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOpenEditPreview(false);
      navigate(`/profile/${userId}`);
      toast.success("Profile Picture changed");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 flex flex-col items-center gap-6">
        <MdClose onClick={() => setOpenEditPreview(false)} />
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
  );
};

export default AddProfile;
