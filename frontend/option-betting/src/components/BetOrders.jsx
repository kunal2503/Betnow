import React, { useState } from "react";
import { MdOutlineSell } from "react-icons/md";
import SellConfirm from "./SellConfirm";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
import { useUser } from "../context/UserProvider";

const BetOrders = ({ orders }) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const {user} = useUser()
  // const navigate = useNavigate()

  const handleCloseModel = () => {
    setShowModel((prev) => !prev);
  };

  const handleSell = (order) => {
    setShowModel(true);
    setSelectedOrder(order);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {orders
        .filter((order) => order.status === "live" )
        .map((order) => (
          <div
            key={order._id}
            className="flex flex-col w-full max-w-lg px-4 py-3 gap-2 rounded-2xl items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <p className="font-bold text-sm text-center text-gray-800">
              {order.eventName}
            </p>
            <div className="flex  gap-4">
              <div className="flex items-center justify-center flex-col">
                <p className="text-xs  text-gray-500">Bet Side</p>
                <p className="">{order.betSide.toUpperCase()}</p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-xs  text-gray-500">Result</p>
                <p className="">{order.result.toUpperCase()}</p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-xs  text-gray-500">Bet Amount</p>
                <p className="  ">{order.amount}</p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-xs  text-gray-500">QTY</p>
                <p className="">{order.quantity}</p>
              </div>
            </div>
            {order.status === "completed" ? (
              <p className="text-green-600 font-bold">Completed</p>
            ) : (
              <button
                className="bg-red-500 font-bold w-1/2 hover:bg-red-600 px-6 py-2 rounded-sm flex items-center justify-center mt-3"
                onClick={() => handleSell(order)}
              >
                <MdOutlineSell />
                Sell
              </button>
            )
            }
          </div>
        ))} 
      {showModel ? (
        <SellConfirm
          handleCloseModel={handleCloseModel}
          order={selectedOrder}
        />
      ) : null}
    </div>
  );
};

export default BetOrders;
