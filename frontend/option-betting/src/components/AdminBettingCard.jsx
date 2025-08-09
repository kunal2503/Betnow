import React, {  } from "react";

const AdminBettingCard = ({event}) => {
  const statusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'text-green-600 font-semibold';
    case 'pending':
      return 'text-yellow-600 font-semibold';
    case 'closed':
    case 'cancelled':
      return 'text-red-600 font-semibold';
    default:
      return 'text-gray-700';
  }
};

  return (
    <div className="flex flex-col w-full max-w-2xl p-6 rounded-xl shadow transition-all duration-200 hover:shadow-lg bg-white">
  <h1 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h1>
  <p className="text-gray-600 mb-4">{event.description}</p>

  <div className="flex flex-wrap gap-4 mb-4 text-sm sm:text-base">
    <div className="font-medium">
      <span className="text-gray-500">Category: </span>{event.category}
    </div>
    <div className="font-medium">
      <span className="text-gray-500">Status: </span>
      <span className={statusClass(event.status)}>
        {event.status}
      </span>
    </div>
    <div className="font-medium">
      <span className="text-gray-500">Start Date: </span>
      {`${event.startTime}`.slice(0, 10)}
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4 mb-4 text-sm sm:text-base">
    <div className="bg-gray-50 rounded p-3 text-center">
      <span className="block text-gray-500 text-xs">Total Yes QTY</span>
      <span className="font-semibold ">{event.totalYesQuantity}</span>
    </div><div className="bg-gray-50 rounded p-3 text-center">
      <span className="block text-gray-500 text-xs">Total No QTY</span>
      <span className="font-semibold ">{event.totalNoQuantity}</span>
    </div>
    <div className="bg-gray-50 rounded p-3 text-center">
      <span className="block text-gray-500 text-xs">Total Yes Bets Amount</span>
      <span className="font-semibold text-green-600">₹{event.totalYesAmount}</span>
    </div>
    <div className="bg-gray-50 rounded p-3 text-center">
      <span className="block text-gray-500 text-xs">Total No Bets Amount</span>
      <span className="font-semibold text-red-600">₹{event.totalNoAmount}</span>
    </div>
    <div className="bg-gray-50 rounded p-3 text-center">
      <span className="block text-gray-500 text-xs">Current Yes Price</span>
      <span className="font-semibold">{event.yesPrice}</span>
    </div>
    <div className="bg-gray-50 rounded p-3 text-center">
      <span className="block text-gray-500 text-xs">Current No Price</span>
      <span className="font-semibold">{event.noPrice}</span>
    </div>
  </div>

  <form className="flex flex-wrap gap-3 items-center justify-start">
    <label className="font-semibold text-gray-700">Declare Result:</label>
    <select
      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select Result</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
      <option value="cancelled">Cancelled</option>
    </select>
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Declare
    </button>
  </form>
</div>

  );
};


export default AdminBettingCard;
