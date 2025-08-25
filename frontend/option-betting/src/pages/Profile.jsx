import React, { useState, useEffect } from "react";
import { MdEdit, MdPerson, MdHistory, MdSettings, MdSupport } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import AddProfile from "../components/AddProfile";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({});
  const [openEditPreview, setOpenEditPreview] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [userResponse, walletResponse] = await Promise.all([
        axiosInstance.get(`/api/profile/user-info/${params.id}`),
        axiosInstance.get(`/api/account/check-balance/${params.id}`)
      ]);
      console.log(userResponse,walletResponse)
      setUser(userResponse.data?.user);
      setWallet(walletResponse.data.balance || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
{console.log(user)}
  const navigationLinks = [
    { to: `/personal-info/${params.id}`, icon: <MdPerson />, text: "Personal Information" },
    { to: `/transitions-history/${params.id}`, icon: <MdHistory />, text: "Transaction History" },
    { to: "/settings", icon: <MdSettings />, text: "Settings" },
    { to: "/support", icon: <MdSupport />, text: "Customer Support" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-8 ">
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 hover:border-blue-500 transition-all duration-300">
              {console.log(user.profileImage)}
              <img
                src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/9069/9069049.png" }
                // alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setOpenEditPreview(true)}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
            >
              <MdEdit size={16} />
            </button>
          </div>

          <h1 className="font-bold text-2xl text-gray-800">
            {user.username || "Loading..."}
          </h1>
        </div>

        {/* Balance Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center min-w-[150px]">
            <span className="block text-gray-500 text-sm mb-1">Available Balance</span>
            <span className="font-bold text-2xl text-green-600">₹{wallet.toLocaleString()}</span>
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              Withdraw
            </button>
            <Link
              to={`/add-balance/${user._id}`}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Deposit
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3 ">
          {navigationLinks.map(({ to, icon, text }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors duration-300 text-gray-700 hover:text-blue-600"
            >
              {icon}
              <span>{text}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {openEditPreview && (
          <AddProfile userId={user._id} setOpenEditPreview={setOpenEditPreview} />
        )}
      </div>
    </div>
  );
};

export default Profile;