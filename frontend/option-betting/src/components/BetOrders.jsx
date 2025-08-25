import React, { useState } from "react";
import { MdOutlineSell, MdErrorOutline } from "react-icons/md";
import { TbMoodEmpty } from "react-icons/tb";
import SellConfirm from "./SellConfirm";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const BetCard = ({ order, onSell }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="relative flex flex-col w-full max-w-lg p-5 gap-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-white shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    {/* Active Indicator */}
    {order.isActive && (
      <span 
        className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse"
        aria-label="Active order"
      />
    )}

    {/* Event Name */}
    <h2 className="text-lg font-bold text-gray-800 text-center">
      {order.eventName}
    </h2>

    {/* Bet Info Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      <InfoItem label="Bet Side" value={order.betSide} valueColor="text-black" />
      <InfoItem label="Result" value={order.result} valueColor="text-yellow-500" />
      <InfoItem label="Amount" value={`₹${order.amount.toLocaleString()}`} valueColor="text-black" />
      <InfoItem label="Qty" value={order.quantity} valueColor="text-black" />
    </div>

    {/* Price & P/L */}
    <div className="flex justify-around text-center mt-2">
      <InfoItem 
        label="Price at Bet" 
        value={`₹${order.priceAtPlaceBet.toLocaleString()}`} 
        valueColor="text-black" 
      />
      <InfoItem 
        label="P/L" 
        value={`₹${calculatePL(order)}`} 
        valueColor={getPLColor(calculatePL(order))} 
      />
    </div>

    {/* Sell Button */}
    <button
      onClick={() => onSell(order)}
      className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg 
                flex items-center justify-center gap-2 transition-colors focus:outline-none 
                focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-label={`Sell order for ${order.eventName}`}
    >
      <MdOutlineSell size={18} />
      Sell
    </button>
  </motion.div>
);

const InfoItem = ({ label, value, valueColor }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className={`font-medium ${valueColor} capitalize`}>
      {value.toString().toLowerCase()}
    </p>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
    <TbMoodEmpty size={48} className="mb-4" />
    <p className="text-lg font-medium">No active Bet found</p>
    <p className="text-sm">Place a bet to see your orders here</p>
  </div>
);

const BetOrders = ({ orders }) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const activeOrders = orders.filter(o => o.quantity !== 0 && o.isActive === true);

  const handleCloseModel = () => setShowModel(false);
  const handleSell = (order) => {
    setSelectedOrder(order);
    setShowModel(true);
  };

  if (!orders) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <MdErrorOutline size={24} className="mr-2" />
        <span>Error loading orders</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <AnimatePresence>
        {activeOrders.length > 0 ? (
          activeOrders.map(order => (
            <BetCard key={order._id} order={order} onSell={handleSell} />
          ))
        ) : (
          <EmptyState />
        )}
      </AnimatePresence>

      {/* Sell Modal */}
      {showModel && (
        <SellConfirm handleCloseModel={handleCloseModel} order={selectedOrder} />
      )}
    </div>
  );
};

// Helper functions
const calculatePL = (order) => {
  // Add your P/L calculation logic here
  return 0;
};

const getPLColor = (pl) => {
  if (pl > 0) return 'text-green-500';
  if (pl < 0) return 'text-red-500';
  return 'text-gray-500';
};

// PropTypes
BetOrders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      eventName: PropTypes.string.isRequired,
      betSide: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      priceAtPlaceBet: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valueColor: PropTypes.string.isRequired,
};

BetCard.propTypes = {
  order: PropTypes.object.isRequired,
  onSell: PropTypes.func.isRequired,
};

export default BetOrders;