import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const AddBalance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBalance = async (e) => {
    e.preventDefault();
    if (!balance || balance <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(`/api/account/add-balance/${id}`, {
        userId: id,
        balance
      });
      toast.success(response?.data?.message || "Balance added successfully");
      navigate(`/profile/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="font-extrabold text-xl text-center mb-6 text-cyan-800">
          Add Balance
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleAddBalance}>
          <div className="flex flex-col">
            <label
              htmlFor="balance"
              className="font-medium text-sm text-gray-600 mb-1"
            >
              Enter Amount
            </label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter amount"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 text-white font-bold py-2 rounded-lg transition hover:bg-green-600 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Balance"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBalance;
