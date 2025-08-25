import React, { useState } from "react";
import { MdEdit, MdPerson, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const PersonalInfo = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!user.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!user.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (user.phone && !/^\d{10}$/.test(user.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axiosInstance.put(`/api/profile/update/${user._id}`, user);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUser(userData);
    setErrors({});
  };

  const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={user?.profileImage || "https://via.placeholder.com/150"}
            alt={user?.name || "Profile"}
            className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
          />
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
            >
              <MdEdit size={16} />
            </button>
          )}
        </div>
      </div>

      {/* View/Edit Forms */}
      {!isEditing ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">{user?.name}</h2>
          <p className="text-gray-500 text-center">{user?.bio || "No bio available"}</p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <MdEmail className="text-gray-400" size={20} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MdPhone className="text-gray-400" size={20} />
              <span>{user?.phone || "No phone number"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MdLocationOn className="text-gray-400" size={20} />
              <span>{user?.location || "No location"}</span>
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className={labelClasses}>
              <MdPerson />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user?.name || ""}
              onChange={handleChange}
              className={`${inputClasses} ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className={labelClasses}>Bio</label>
            <textarea
              name="bio"
              value={user?.bio || ""}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Tell us about yourself"
              rows="3"
            />
          </div>

          <div>
            <label className={labelClasses}>
              <MdEmail />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              onChange={handleChange}
              className={`${inputClasses} ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className={labelClasses}>
              <MdPhone />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={user?.phone || ""}
              onChange={handleChange}
              className={`${inputClasses} ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className={labelClasses}>
              <MdLocationOn />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={user?.location || ""}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your location"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

PersonalInfo.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    profileImage: PropTypes.string,
  }).isRequired,
};

export default PersonalInfo;