import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import BetOrders from "../components/BetOrders";
import { useUser } from "../context/UserProvider";
import { MdShoppingCart, MdRefresh } from "react-icons/md";
import toast from "react-hot-toast";

const Orders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrdersData = async () => {
    if (!user?._id) return;
    
    try {
      const response = await axiosInstance.get(
        `/api/bet/get-bet-orders/${user._id}`
      );
      setOrders(response?.data?.orders || []);
      console.log(response.data.orders, orders)
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersData();
    // const interval = setInterval(getOrdersData, 1000);
    // return () => clearInterval(interval);
  }, []); 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <MdShoppingCart className="text-3xl text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-800 text-center">Active Bets</h1>
         <button
                  onClick={getOrdersData}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors absolute right-10"
                  aria-label="Refresh events"
                >
                  <MdRefresh size={24} />
                </button>
      </div>

        <div className="space-y-4">
          <BetOrders orders={orders} />
        </div>
     
    </div>
  );
};

export default Orders;