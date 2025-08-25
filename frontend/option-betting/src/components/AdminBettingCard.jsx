import React, { useState } from "react";
import clsx from "clsx";
import { MdDelete, MdCheck, MdWarning } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const AdminBettingCard = ({ event, onEventUpdate }) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState({ declare: false, delete: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusClass = (status) =>
    clsx("font-semibold", {
      "text-green-600": status?.toLowerCase() === "live",
      "text-yellow-600": status?.toLowerCase() === "pending",
      "text-red-600": ["closed", "cancelled"].includes(status?.toLowerCase()),
      "text-gray-700": !status,
    });

  const handleResult = async (e) => {
    e.preventDefault();
    if (!result) return;

    try {
      setLoading(prev => ({ ...prev, declare: true }));
      const response = await axiosInstance.post(
        `/api/admin/event/declare-result/${event._id}`,
        { result }
      );
      
      toast.success(response?.data?.message || "Result declared successfully");
      onEventUpdate?.();
      setResult("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to declare result");
      console.error("Declare result error:", error);
    } finally {
      setLoading(prev => ({ ...prev, declare: false }));
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(prev => ({ ...prev, delete: true }));
      const response = await axiosInstance.delete(
        `/api/admin/event/delete-event/${event._id}`
      );
      
      toast.success(response?.data?.message || "Event deleted successfully");
      onEventUpdate?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event");
      console.error("Delete event error:", error);
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="flex flex-col w-full  max-w-2xl p-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl bg-white">
      {/* Title & Description */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        {event?.title || "Untitled Event"}
      </h2>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm sm:text-base">
        <MetaItem label="Category" value={event?.category} />
        <MetaItem 
          label="Status" 
          value={event?.status} 
          className={statusClass(event?.status)} 
        />
        <MetaItem 
          label="Start Date" 
          value={formatDate(event?.startTime)} 
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm sm:text-base">
        <StatsGrid event={event} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Declare Result */}
        <div className="flex-1 min-w-[200px]">
          <form onSubmit={handleResult} className="flex gap-2">
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       disabled:opacity-50"
              disabled={loading.declare}
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
              disabled={!result || loading.declare}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium
                       hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all
                       flex items-center gap-2"
            >
              {loading.declare ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Declaring...
                </>
              ) : (
                <>
                  <MdCheck size={18} />
                  Declare
                </>
              )}
            </button>
          </form>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading.delete}
          className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-medium
                   hover:bg-red-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   flex items-center gap-2"
        >
          <MdDelete size={18} />
          Delete Event
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          loading={loading.delete}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          eventTitle={event.title}
        />
      )}
    </div>
  );
};

// Helper Components
const MetaItem = ({ label, value, className }) => (
  <div className="font-medium">
    <span className="text-gray-500">{label}: </span>
    <span className={className}>
      {value ? (
        typeof value === 'string' 
          ? value.charAt(0).toUpperCase() + value.slice(1) 
          : value
      ) : "—"}
    </span>
  </div>
);

const StatsGrid = ({ event }) => (
  <>
    {[
      ["Total Yes QTY", event?.totalYesQuantity],
      ["Total No QTY", event?.totalNoQuantity],
      ["Total Yes Bets Amount", `₹${event?.totalYesAmount?.toLocaleString() || 0}`, "text-green-600"],
      ["Total No Bets Amount", `₹${event?.totalNoAmount?.toLocaleString() || 0}`, "text-red-600"],
      ["Current Yes Price", event?.yesPrice],
      ["Current No Price", event?.noPrice],
    ].map(([label, value, extraClass], idx) => (
      <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center">
        <span className="block text-gray-500 text-xs mb-1">{label}</span>
        <span className={clsx("font-semibold", extraClass)}>
          {value ?? "—"}
        </span>
      </div>
    ))}
  </>
);

const DeleteConfirmModal = ({ loading, onConfirm, onCancel, eventTitle }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center   z-50">
    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
      <div className="flex items-center gap-3 text-amber-500 mb-4">
        <MdWarning size={24} />
        <h3 className="text-lg font-bold">Delete Event</h3>
      </div>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete "{eventTitle}"? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                   flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <MdDelete size={18} />
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);

// PropTypes
AdminBettingCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    totalYesQuantity: PropTypes.number,
    totalNoQuantity: PropTypes.number,
    totalYesAmount: PropTypes.number,
    totalNoAmount: PropTypes.number,
    yesPrice: PropTypes.number,
    noPrice: PropTypes.number,
  }).isRequired,
  onEventUpdate: PropTypes.func,
};

// Helper function
const formatDate = (date) => 
  date ? new Date(date).toLocaleDateString("en-IN", {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) : "—";

export default AdminBettingCard;