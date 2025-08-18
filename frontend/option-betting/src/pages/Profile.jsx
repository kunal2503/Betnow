import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import AddProfile from "../components/AddProfile";

const Profile = () => {
  const [user, setUser] = useState({});
  const [openEditPreview, setOpenEditPreview] = useState(false);
  const [wallet, setWallet] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userInfo = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/profile/user-info/${params.id}`);
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const checkWalletBalance = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/account/check-balance/${params.id}`);
      setWallet(data.balance || 0);
    } catch (error) {
      console.error("Error checking wallet balance:", error);
    }
  };

  useEffect(() => {
    userInfo();
    checkWalletBalance();
  }, [params.id]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 space-y-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-25 h-25 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center flex-col">
            <img
              src={user.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <button
            onClick={() => setOpenEditPreview(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 m-2 rounded-sm flex items-center"
          >
            <MdEdit size={20} className="mr-1" />
            Edit Profile
          </button>

          <h1 className="font-semibold text-2xl text-gray-800">
            {user.username || "Loading..."}
          </h1>
        </div>

        {/* Balance Section */}
        <div className="flex justify-center items-center gap-4">
          <div className="bg-gray-50 rounded p-3 text-center">
            <span className="block text-gray-500 text-xs">Available Balance</span>
            <span className="font-semibold text-green-600">₹{wallet}</span>
          </div>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Withdraw
            </button>
            <Link
              to={`/add-balance/${user._id}`}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Deposit
            </Link>
          </div>
        </div>

        {openEditPreview && (
          <AddProfile userId={user._id} setOpenEditPreview={setOpenEditPreview} />
        )}

        {/* Navigation Links */}
        <div className="space-y-3 text-lg flex items-center flex-col">
          <Link to={`/personal-info/${user._id}`} className="hover:text-blue-600 transition">
            Personal Information
          </Link>
          <Link
            to={`/transitions-history/${user._id}`}
            className="hover:text-blue-600 transition"
          >
            Transaction History
          </Link>
          <Link to="/settings" className="hover:text-blue-600 transition">
            Settings
          </Link>
          <Link to="/support" className="hover:text-blue-600 transition">
            Customer Support
          </Link>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
