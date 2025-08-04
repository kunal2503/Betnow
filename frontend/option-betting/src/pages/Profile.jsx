import React, { useState, useEffect } from 'react'
import { MdEdit, MdClose } from 'react-icons/md'
import { Link, Navigate, useParams } from 'react-router'
import axiosInstance from "../../utils/axiosInstance"
import AddProfile from "../components/AddProfile"


const Profile = () => {
  const [user, setUser] = useState({});
  const [openEditPreview, setOpenEditPreview] = useState(false);
  const params = useParams();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  // if (!user) {
  //   return <Navigate to="/login" />
  // }
// console.log(user);
const userInfo = async() =>{
  try{
    const response = await axiosInstance.post(`/api/profile/get-user-info/${params.id}`) 
    setUser(response.data.user);
    // localStorage.setItem("profileImage", JSON.stringify(response.data.user.profileImage));
    // console.log(response.data.user)
  } catch(error){
      console.log(error)
  }
}

useEffect(() =>{
  userInfo();
},[user])

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 space-y-8">
        
        {/* Profile Section */}
        <div encType='mul' className="flex flex-col items-center justify-center">
          <div className='w-25 h-25 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center flex-col '>
            <img  src={`${user.profileImage}`}  alt="Profile" className="w-20 h-20 rounded-full object-cover " />
          </div>
           <button onClick={()=> setOpenEditPreview(true)} className="bg-blue-600 hover-bg-blue-700 text-white px-4 py-2 m-2 rounded-sm">
            <MdEdit size={20} className="inline mr-1" />
            Edit Profile
          </button>
          
          <h1 className="font-semibold text-2xl text-gray-800">{user.username}</h1>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Available Balance", amount: "$10000" },
            { title: "Use Balance", amount: "$700" },
            { title: "Withdraw", amount: "$0.00" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 border rounded-lg shadow-sm p-4 text-center hover:shadow-md transition"
            >
              <h2 className="text-sm font-medium text-gray-600">{item.title}</h2>
              <span className="text-2xl font-bold text-gray-900">{item.amount}</span>
            </div>
          ))}
        </div>
          
        {openEditPreview ? <AddProfile userId={user._id} setOpenEditPreview={setOpenEditPreview} /> : null}

        {/* Withdraw / Deposit */}
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Withdraw
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Deposit
          </button>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3 text-lg text-center">
          <Link to="/personal-info" className="block hover:text-blue-600 transition">
            Personal Information
          </Link>
          <Link to="/transactions" className="block hover:text-blue-600 transition">
            Transaction History
          </Link>
          <Link to="/settings" className="block hover:text-blue-600 transition">
            Settings
          </Link>
          <Link to="/support" className="block hover:text-blue-600 transition">
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
  )
}

export default Profile
