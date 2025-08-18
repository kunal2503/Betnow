import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const UserBettingCard = ({ event, userId }) => {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBetPlace = async (betSide) => {
    if (!quantity || quantity <= 0) {
      return toast.error("Please enter a valid quantity");
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
      toast.success("Order placed successfully");
      navigate("/");
    } catch (error) {
      const message = error?.response?.data?.message || "Error placing the bet";
      toast.error(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-col w-full max-w-1/2 p-8 gap-2 rounded-2xl items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <p className="font-bold md:text-2xl text-sm text-center text-gray-800">
        {event.title}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <label className="font-semibold text-gray-700 flex-shrink-0">
          Select Quantity:
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min={1}
          className="w-20 border border-gray-300 text-center py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          </div>
          
          <div className="flex items-center justify-between gap-6 w-full mt-2">
          <button
          disabled={loading}
          onClick={() => handleBetPlace("yes")}
          className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-300 focus:outline-none text-center"
          >
          {loading ? "Placing..." : `Yes ₹${event.yesPrice}`}
          </button>
          <button
          disabled={loading}
          onClick={() => handleBetPlace("no")}
          className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-300 focus:outline-none text-center"
          >
          {loading ? "Placing..." : `No ₹${event.noPrice}`}
          </button>
          </div>
          </div>
  );
};

export default UserBettingCard;
