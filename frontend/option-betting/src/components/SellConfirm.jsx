import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const SellConfirm = ({ order, handleCloseModel }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post(`/api/bet/sell-bet/${order._id}`);
      toast.success("✅ Sold successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("❌ Error processing sell");
      console.error(error);
    } finally {
      setLoading(false);
      handleCloseModel(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 animate-fadeIn">
      <form className="bg-gray-900 text-white rounded-xl shadow-lg p-6 w-full max-w-md animate-slideUp">
        <h1 className="font-bold text-xl text-center mb-4">Confirm to Sell</h1>

        {/* Bet Details */}
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-400">Event</p>
          <p className="font-semibold">{order.eventName}</p>

          <div className="flex justify-between mt-3 text-sm">
            <div>
              <p className="text-gray-400">Bet Side</p>
              <p className="font-medium">{order.betSide.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-400">Amount</p>
              <p className="font-medium">{order.amount}</p>
            </div>
            <div>
              <p className="text-gray-400">Qty</p>
              <p className="font-medium">{order.quantity}</p>
            </div>
          </div>
        </div>

        {/* Confirmation Text */}
        <p className="text-center text-sm mb-4">
          Are you sure you want to <span className="text-red-400 font-bold">sell</span> this bet?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={handleCloseModel}
            className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleConfirm}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Selling..." : "Confirm Sell"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellConfirm;
