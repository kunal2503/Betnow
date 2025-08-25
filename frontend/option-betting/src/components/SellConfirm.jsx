import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { MdClose, MdWarning } from "react-icons/md";

const SellConfirm = ({ order, handleCloseModel }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleCloseModel();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleCloseModel]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await axiosInstance.post(`/api/bet/sell-bet/${order._id}`);
      
      toast.success("Bet sold successfully!", {
        icon: '✅',
        duration: 4000
      });
      
      navigate("/orders");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to process sell order";
      toast.error(errorMessage, {
        icon: '❌',
        duration: 5000
      });
      console.error("Sell error:", error);
    } finally {
      setLoading(false);
      handleCloseModel(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && handleCloseModel()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sell-confirm-title"
    >
      <form 
        className="relative bg-gray-900 text-white rounded-xl shadow-lg p-6 w-full max-w-md animate-slideUp"
        onSubmit={handleConfirm}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleCloseModel}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <MdClose size={24} />
        </button>

        <h1 id="sell-confirm-title" className="font-bold text-xl text-center mb-6">
          Confirm to Sell
        </h1>

        {/* Bet Details */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6 space-y-4">
          <div>
            <p className="text-sm text-gray-400">Event</p>
            <p className="font-semibold">{order.eventName}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Bet Side</p>
              <p className="font-medium">{order.betSide.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-400">Amount</p>
              <p className="font-medium">₹{order.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Quantity</p>
              <p className="font-medium">{order.quantity}</p>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="flex items-center gap-2 mb-6 p-3 bg-red-500/10 rounded-lg">
          <MdWarning className="text-red-400 text-xl flex-shrink-0" />
          <p className="text-sm text-red-300">
            This action cannot be undone. Are you sure you want to sell this bet?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCloseModel}
            className="px-6 py-2 rounded-lg font-semibold transition-all duration-200 
                     bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold 
                     transition-all duration-200 flex items-center gap-2 
                     disabled:opacity-70 disabled:cursor-not-allowed
                     focus:ring-2 focus:ring-red-500"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Selling...
              </>
            ) : (
              'Confirm Sell'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellConfirm;