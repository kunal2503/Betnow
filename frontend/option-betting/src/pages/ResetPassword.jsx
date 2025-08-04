import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';

const ResetPassword = () => {
  const email = localStorage.getItem("verify-email");

  const [passwordData, setPasswordData] = useState({
    email: email,
    new_password: "",
    confirm_password: ""
  });
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleResetpassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      return console.log("New and confirm password do not match");
    }

    try {
        
      const response = await axiosInstance.post("/api/auth/forget-password", passwordData);
      console.log("Password reset successful", response.data);
      localStorage.removeItem("verify-email");
      navigate("/")
      // Redirect or show success message
    } catch (error) {
      console.log("Error:", error.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <form className='flex justify-between items-center flex-col gap-5 shadow-lg px-10 py-8'>
        <div>
          <h1 className='font-bold text-2xl'>New Password</h1>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="new-password" className='font-light text-sm'>New Password</label>
          <input
            type="password"
            id='new-password'
            onChange={handleChanges}
            value={passwordData.new_password}
            name='new_password'
            placeholder='Enter new password'
            className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="confirm-password" className='font-light text-sm'>Confirm Password</label>
          <input
            placeholder='Confirm password'
            type="password"
            onChange={handleChanges}
            value={passwordData.confirm_password}
            id='confirm-password'
            name='confirm_password'
            className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm'
          />
        </div>
        <button onClick={handleResetpassword} className='bg-cyan-600 mt-5 hover:bg-cyan-700 px-8 py-2 rounded-lg font-bold'>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
