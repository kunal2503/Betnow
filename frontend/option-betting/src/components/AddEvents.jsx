import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserProvider";
import toast from "react-hot-toast";

const AddEvents = ({ setOpenAddEvent }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    question: "",
    category: "",
    createdBy: user._id
  });
  const [loading, setLoading] = useState(false);

  const handleChanges = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!event.question.trim() || !event.category.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/admin/event/add-event",
        event
      );
      toast.success(response?.data?.message || "Event created successfully");
      setOpenAddEvent(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating event");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-[50%] p-6 flex flex-col gap-6">
        <div className="flex justify-end">
          <MdClose
            className="text-2xl cursor-pointer hover:text-red-500"
            onClick={() => setOpenAddEvent(false)}
          />
        </div>

        <h1 className="font-bold text-2xl text-center">Create New Event</h1>

        <form className="flex flex-col gap-5" onSubmit={handleAddEvent}>
          <div className="flex flex-col">
            <label htmlFor="question" className="font-light text-sm">
              Question
            </label>
            <input
              type="text"
              id="question"
              onChange={handleChanges}
              value={event.question}
              name="question"
              placeholder="Enter a question"
              className="border px-4 border-gray-500 focus:outline-none focus:border-2 focus:border-black rounded-md py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="font-light text-sm">
              Category
            </label>
            <input
              type="text"
              id="category"
              onChange={handleChanges}
              value={event.category}
              name="category"
              placeholder="Enter a category"
              className="border px-4 border-gray-500 focus:outline-none focus:border-2 focus:border-black rounded-md py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-bold transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
