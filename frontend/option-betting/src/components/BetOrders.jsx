import React, { useState } from "react";
import { MdOutlineSell } from "react-icons/md";
import SellConfirm from "./SellConfirm";
import { useUser } from "../context/UserProvider";

const BetOrders = ({ orders }) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useUser();

  const handleCloseModel = () => setShowModel(false);
  const handleSell = (order) => {
    setSelectedOrder(order);
    setShowModel(true);
  };



  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      {orders.filter(o => o.quantity !== 0 && o.isActive === true).map(order => (
        <div
          key={order._id}
          className="relative flex flex-col w-full max-w-lg p-5 gap-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-white shadow-lg  hover:shadow-2xl transition-all duration-300"
        >
          {/* Active Pulse */}
          {order.isActive && (
            <span className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          )}

          {/* Event Name */}
          <h2 className="text-lg font-bold text-blasck text-center">
            {order.eventName}
          </h2>

          {/* Bet Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center ">
            <div>
              <p className="text-xs text-gray-400">Bet Side</p>
              <p className="text-black font-medium">{order.betSide.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Result</p>
              <p className="text-yellow-500 font-medium">{order.result.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Amount</p>
              <p className="text-black font-medium">{order.amount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Qty</p>
              <p className="text-black font-medium">{order.quantity}</p>
            </div>
          </div>

          {/* Price & P/L */}
          <div className="flex justify-around text-center mt-2">
            <div>
              <p className="text-xs text-gray-400">Price at Bet</p>
              <p className="text-black font-medium">{order.priceAtPlaceBet}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 ">P/L</p>
              <p className="font-medium">{0}</p>
            </div>
          </div>

          {/* Action Button */}
            <button
              onClick={() => handleSell(order)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MdOutlineSell size={18} />
              Sell
            </button>
        </div>
      ))}

      {/* Sell Modal */}
      {showModel && (
        <SellConfirm handleCloseModel={handleCloseModel} order={selectedOrder} />
      )}
    </div>
  );
};

export default BetOrders;
