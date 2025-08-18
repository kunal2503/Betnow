import React, { useState } from "react";

const PersonalInfo = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(userData);
    
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // 🔥 Here you can call API to save updated info
    console.log("Updated user:", user);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={user?.profileImage}
          alt={user?.name}
          className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
        />
      </div>

      {/* View Mode */}
      {!isEditing ? (
        <>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-500">{user?.bio || "No bio available"}</p>

          <div className="mt-4 text-left space-y-2 text-gray-700">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Location:</strong> {user?.location}</p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Edit Info
          </button>
        </>
      ) : (
        /* Edit Mode */
        <div className="space-y-3 text-left">
          <input
            type="text"
            name="name"
            value={user?.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="bio"
            value={user?.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            name="email"
            value={user?.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="phone"
            value={user?.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="location"
            value={user?.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
