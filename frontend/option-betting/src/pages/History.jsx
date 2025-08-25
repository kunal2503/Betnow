import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../context/UserProvider";
import { MdHistory, MdErrorOutline } from "react-icons/md";
import toast from "react-hot-toast";

const History = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrdersData = async () => {
    if (!user?._id) return;
    try {
      const response = await axiosInstance.get(`/api/bet/bet-history/${user._id}`);
      const sortedOrders = (response.data.orders || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch betting history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersData();
  }, [user?._id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <MdHistory className="w-16 h-16 text-gray-400" />
        <p className="text-gray-500 text-lg">No betting history found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <MdHistory className="text-3xl text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-800">Betting History</h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-semibold text-lg text-gray-800">
                {order.eventName}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${(order.result === "cancelled" || order.result === "loss" )
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800" }`}>
                {order.result?.charAt(0).toUpperCase() + order.result?.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Bet Side", value: order.betSide?.toUpperCase() },
                { label: "Type", value: order.type?.toUpperCase() },
                { label: "Amount", value: `₹${order.amount?.toFixed(2)}` },
                { label: "Quantity", value: order.quantity },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <time className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;