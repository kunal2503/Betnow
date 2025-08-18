import React, { useState } from "react";
import clsx from "clsx";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const AdminBettingCard = ({ event }) => {
  const [result, setResult] = useState("");
  const resultData = {
    result : result || "",
    
  }

  const statusClass = (status) =>
    clsx("font-semibold", {
      "text-green-600": status?.toLowerCase() === "live",
      "text-yellow-600": status?.toLowerCase() === "pending",
      "text-red-600":
        status?.toLowerCase() === "closed" ||
        status?.toLowerCase() === "cancelled",
      "text-gray-700": !status,
    });

  const handleResult = async (e) => {
    e.preventDefault();
    try {
      console.log(result);
      const response = await axiosInstance.post(
        `/api/admin/event/declare-result/${event._id}`,
        resultData
      );
    } catch (error) {
      toast.error(error.response.data.message || "Internal server error");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      console.log(event._id);
      const response = await axiosInstance.delete(
        `/api/admin/event/delete-event/${event._id}`
      );
      toast.success(
        response?.data?.message || "Event deleted successfully deleted"
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error");
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "—";

  return (
    <div className="flex flex-col w-full max-w-2xl p-6 rounded-xl shadow transition-all duration-200 hover:shadow-lg bg-white">
      {/* Title & Description */}
      <h1 className="text-2xl font-bold mb-2 text-gray-800">
        {event?.title || "Untitled Event"}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm sm:text-base">
        <div className="font-medium">
          <span className="text-gray-500 ">Category: </span>
          {event?.category.charAt(0).toUpperCase() + event.category.slice(1) ||
            "—"}
        </div>
        <div className="font-medium">
          <span className="text-gray-500">Status: </span>
          <span className={statusClass(event?.status)}>
            {event?.status || "—"}
          </span>
        </div>
        <div className="font-medium">
          <span className="text-gray-500">Start Date: </span>
          {formatDate(event?.startTime)}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm sm:text-base">
        {[
          ["Total Yes QTY", event?.totalYesQuantity],
          ["Total No QTY", event?.totalNoQuantity],
          [
            "Total Yes Bets Amount",
            `₹${event?.totalYesAmount || 0}`,
            "text-green-600",
          ],
          [
            "Total No Bets Amount",
            `₹${event?.totalNoAmount || 0}`,
            "text-red-600",
          ],
          ["Current Yes Price", event?.yesPrice],
          ["Current No Price", event?.noPrice],
        ].map(([label, value, extraClass], idx) => (
          <div key={idx} className="bg-gray-50 rounded p-3 text-center">
            <span className="block text-gray-500 text-xs">{label}</span>
            <span className={clsx("font-semibold", extraClass)}>
              {value ?? "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Declare Result Form */}
      <form className="flex flex-wrap gap-3 items-center justify-start">
        <label className="font-semibold text-gray-700">Declare Result:</label>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Result</option>
          {["yes", "no", "cancelled"].map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          onClick={handleResult}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!result}
        >
          Declare
        </button>
        <button
          className=" bg-red-500 hover:bg-red-600 text-black rounded-sm transition-all px-4 py-2 "
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default AdminBettingCard;
