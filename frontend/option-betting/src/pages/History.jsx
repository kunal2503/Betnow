import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../context/UserProvider";

const History = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrdersData = async () => {
    if (!user?._id) return;
    try {
      const response = await axiosInstance.get(`/api/bet/bet-history/${user._id}`);

      // Sort by createdAt descending (most recent first)
      const sortedOrders = (response.data.orders || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sortedOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersData();
  }, [user?._id]);

  if (loading) {
    return <div className="flex justify-center py-10 text-gray-500">Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="flex justify-center py-10 text-gray-500">History Not Found.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 py-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col w-full max-w-lg px-4 py-3 gap-2 rounded-2xl items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <p className="font-bold text-sm text-center text-gray-800">{order.eventName}</p>
          
          <div className="flex gap-4">
            {[
              { label: "Bet Side", value: order.betSide?.toUpperCase() },
              { label: "Type", value: order.type?.toUpperCase() },
              { label: "Bet Amount", value: `₹${order.amount?.toFixed(2)}` },
              { label: "QTY", value: order.quantity },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <p className="text-xs text-gray-500">{label}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>

          {/* Show status */}
          {order.status === "completed" && (
            <p className="text-green-600 font-bold">Completed</p>
          )}

          {/* Show order date */}
          <p className="text-xs text-gray-400">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default History;
