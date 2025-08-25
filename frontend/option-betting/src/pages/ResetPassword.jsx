import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';
import { MdLock, MdError } from 'react-icons/md';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const email = localStorage.getItem("verify-email");
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    email: email,
    new_password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!passwordData.new_password) {
      newErrors.new_password = "New password is required";
    } else if (passwordData.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters";
    }

    if (!passwordData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (passwordData.new_password !== passwordData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axiosInstance.post("/api/auth/forget-password", passwordData);
      localStorage.removeItem("verify-email");
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500">Enter your new password below</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MdLock className="text-gray-400" />
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new_password"
              value={passwordData.new_password}
              onChange={handleChanges}
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                errors.new_password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter new password"
            />
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <MdError />
                {errors.new_password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirm-password" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MdLock className="text-gray-400" />
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm_password"
              value={passwordData.confirm_password}
              onChange={handleChanges}
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                errors.confirm_password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <MdError />
                {errors.confirm_password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                <span>Resetting Password...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;