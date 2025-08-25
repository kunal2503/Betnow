import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { MdWarning } from "react-icons/md";

const UserBettingCard = ({ event, userId }) => {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateQuantity = (value) => {
    if (!value || value <= 0) {
      setError("Quantity must be greater than 0");
      return false;
    }
    if (value > 100) { // Add maximum limit if needed
      setError("Maximum quantity exceeded");
      return false;
    }
    setError("");
    return true;
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    validateQuantity(value);
  };

  const handleBetPlace = async (betSide) => {
    if (!validateQuantity(quantity)) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const betData = {
      userId,
      eventId: event._id,
      betSide,
      quantity: Number(quantity),
    };

    try {
      setLoading(true);
      await axiosInstance.post("/api/bet/place-bet", betData);
      toast.success(`Successfully placed ${betSide} bet for ${quantity} units`);
      navigate("/orders");
    } catch (error) {
      const message = error?.response?.data?.message || "Error placing the bet";
      toast.error(message);
      console.error("Bet placement error:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      <div className="space-y-4">
        {/* Event Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          {event.title}
        </h2>

        {/* Quantity Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Quantity:
          </label>
          <div className="relative">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="100"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter quantity"
            />
            {error && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
                <MdWarning />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price Display */}
        <div className="grid grid-cols-2 gap-4 text-center py-2">
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="text-sm text-gray-600">Yes Price</p>
            <p className="font-semibold text-green-600">₹{event.yesPrice}</p>
          </div>
          <div className="bg-red-50 p-2 rounded-lg">
            <p className="text-sm text-gray-600">No Price</p>
            <p className="font-semibold text-red-600">₹{event.noPrice}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            disabled={loading}
            onClick={() => handleBetPlace("yes")}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                <span>Placing...</span>
              </div>
            ) : (
              "Place Yes Bet"
            )}
          </button>
          <button
            disabled={loading}
            onClick={() => handleBetPlace("no")}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                <span>Placing...</span>
              </div>
            ) : (
              "Place No Bet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBettingCard;