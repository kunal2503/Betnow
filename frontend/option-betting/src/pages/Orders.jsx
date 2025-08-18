import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import BetOrders from "../components/BetOrders";
import { useUser } from "../context/UserProvider";

const Orders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrdersData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/bet/get-bet-orders/${user._id}`
      );
      setOrders(response?.data?.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getOrdersData();
      const interval = setInterval(getOrdersData,1000);

      return () => clearInterval(interval)
  }, [orders]);

  return (
    <div className="flex flex-col justify-center w-full m-10">
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length > 0 ? (
        <BetOrders orders={orders} />
      ) : (
        <p className="text-center text-gray-500">No orders found</p>
      )}
    </div>
  );
};

export default Orders;
