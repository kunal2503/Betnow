import React, { useState, useCallback } from "react";
import { MdClose, MdCloudUpload, MdWarning } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const AddProfile = ({ userId, setOpenEditPreview }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Image validation
  const validateFile = (file) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload a JPG or PNG image";
    }
    if (file.size > MAX_SIZE) {
      return "Image size should be less than 5MB";
    }
    return null;
  };

  // Handle file selection
  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const error = validateFile(selectedFile);
    if (error) {
      setError(error);
      setFile(null);
      setPreview(null);
      return;
    }

    setError("");
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  }, []);

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    try {
      setLoading(true);
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
      toast.error(error.response?.data?.message || "Error uploading profile picture");
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setOpenEditPreview(false)}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Profile Picture
          </h2>
          <button
            onClick={() => setOpenEditPreview(false)}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleFileUpload} className="space-y-6">
          {/* Upload Area */}
          <div className="relative">
            <input
              type="file"
              id="addImage"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload profile picture"
            />
            <label
              htmlFor="addImage"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
                ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-blue-500 bg-gray-50'}`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center p-4 text-gray-500">
                  <MdCloudUpload size={40} className="mb-2" />
                  <p className="text-sm text-center">
                    Click to upload or drag and drop<br />
                    <span className="text-xs">PNG or JPG (max 5MB)</span>
                  </p>
                </div>
              )}
            </label>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <MdWarning />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Selected File Name */}
          {file && !error && (
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span>Selected:</span>
              <span className="font-medium truncate">{file.name}</span>
            </div>
          )}

           {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !file || error}
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium
                     hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all
                     flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

AddProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  setOpenEditPreview: PropTypes.func.isRequired,
};

export default AddProfile;