import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { MdHistory } from "react-icons/md";

const TransitionsHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const handleHistory = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/api/account/transitions-history/${params.id}`
      );

      if (Array.isArray(data.history) && data.history.length > 0) {
        const sortedHistory = [...data.history].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setHistory(sortedHistory);
        toast.success("History loaded successfully");
      } else {
        setHistory([]);
      }
    } catch (error) {
      setHistory([]);
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <MdHistory className="text-3xl text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
      </div>

      {history.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((data) => (
                  <tr key={data._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${data.status === "successfull" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`${(data.type === "debit" || data.type === "internalDebit") 
                        ? "text-red-600" 
                        : "text-green-600"}`}>
                        {(data.type === "debit" || data.type === "internalDebit") 
                          ? `-₹${data.amount}` 
                          : `+₹${data.amount}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(data.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <MdHistory className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
          <p className="mt-1 text-sm text-gray-500">No transaction history available.</p>
        </div>
      )}
    </div>
  );
};

export default TransitionsHistory;