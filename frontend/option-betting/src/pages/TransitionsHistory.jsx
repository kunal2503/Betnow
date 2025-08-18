import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const TransitionsHistory = () => {
  const [history, setHistory] = useState([]);
  const params = useParams();

  const handleHistory = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/account/transitions-history/${params.id}`
      );

      if (Array.isArray(data.history) && data.history.length > 0) {
        // Sort latest first by createdAt
        const sortedHistory = [...data.history].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setHistory(sortedHistory);
        toast.success("History Extracted");
      } else {
        setHistory([]);
        toast.error("No history found");
      }
    } catch (error) {
      setHistory([]);
      toast.error("Failed to fetch history");
    }
  };

  useEffect(() => {
    handleHistory();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center m-5 border-t border-b  border-gray-500 py-4">
      {history.length > 0 ? (
        history.map((data) => (
          <div
            key={data._id} className="flex items-center gap-10 justify-center rounded-sm   h-20 p-4 border-b border-b-gray-300"
          >
            <div className="text-center">
              <h1 className="font-semibold">Transaction ID:</h1>
              <p>{data._id}</p>
            </div>
            <div className="text-center">
              <h1 className="font-semibold">Status</h1>
              <p>{data.status.charAt(0).toUpperCase() + data.status.slice(1)}</p>
            </div>
            <div className="text-center">
              <h1 className="font-semibold">Amount</h1>
              <p>₹{data.amount}</p>
            </div>
            <div className="text-center">
              <h1 className="font-semibold">Type</h1>
              <p>{data.type.charAt(0).toUpperCase() +  data.type.slice(1)}</p>
            </div>
            <div className="text-center">
              <h1 className="font-semibold">Date</h1>
              <p>{new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <h1 className="font-semibold">Time</h1>
              <p>{new Date(data.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No transaction history available.</p>
      )}
    </div>
  );
};

export default TransitionsHistory;
