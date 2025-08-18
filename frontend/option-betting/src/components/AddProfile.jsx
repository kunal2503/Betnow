import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddProfile = ({ userId, setOpenEditPreview }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosInstance.post(
        `/api/profile/update-profile/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response?.data?.message || "Profile picture updated");
      setOpenEditPreview(false);
      navigate(`/profile/${userId}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error uploading profile picture"
      );
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 flex flex-col gap-6">
        {/* Close Button */}
        <div className="flex justify-end ">
          <MdClose onClick={() => setOpenEditPreview(false)} className="text-2xl cursor-pointer hover:text-red-500 transition "/>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-center">
          Update Profile Picture
        </h1>

        {/* Form */}
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleFileUpload}
          encType="multipart/form-data"
        >
          <div className="flex flex-col">
            <label
              className="text-sm font-light mb-1"
              htmlFor="addImage"
            >
              Select Image
            </label>
            <input
              type="file"
              id="addImage"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              name="image"
              className="border px-2 py-1 rounded-md text-sm w-full"
            />
            {file && (
              <span className="text-xs text-gray-500 mt-1">
                Selected: {file.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md transition hover:bg-blue-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;
