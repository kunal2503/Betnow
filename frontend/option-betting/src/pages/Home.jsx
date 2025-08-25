import React, { useState, useEffect } from "react";
import UserBettingCard from "../components/UserBettingCard";
import { MdAdd, MdRefresh, MdEventBusy } from "react-icons/md";
import AddEvents from "../components/AddEvents";
import axiosInstance from "../../utils/axiosInstance";
import AdminBettingCard from "../components/AdminBettingCard";
import { useUser } from "../context/UserProvider";
import toast from "react-hot-toast";

const Home = () => {
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const eventData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/admin/event/all-events");

      const sortedEvents = (response.data.events || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setEvents(sortedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Effect on user exprience
    eventData();
    // const interval = setInterval(eventData, 5000);
    // return () => clearInterval(interval);
  }, []);

  const renderEvents = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <MdEventBusy className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-lg text-gray-500">No events available</p>
        </div>
      );
    }

    // <div className="flex flex-col items-center justify-center">
    //     {
    return user.role === "admin" ? (
          events.map((event) => (
            <AdminBettingCard key={event._id} event={event} />
          ))
    ) : (
      events
      .filter((event) => event.status === "live")
      .map((event) => (
        <UserBettingCard key={event._id} event={event} userId={user._id} />
      ))

    );
  // }
  // </div>
  }; 

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center items-center  mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {user.role === "admin" ? "Event Management" : "Available Events"}
        </h1>
        <button
          onClick={eventData}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors absolute right-10"
          aria-label="Refresh events"
        >
          <MdRefresh size={24} />
        </button>
      </div>

      <div className="flex items-center justify-center">
        {renderEvents()}
      </div>

      {user.role === "admin" && (
        <button
          onClick={() => setOpenAddEvent(true)}
          className="bg-blue-500 hover:bg-blue-600 fixed bottom-8 right-8 p-3 rounded-full shadow-lg text-white transition-all hover:scale-110"
          aria-label="Add Event"
        >
          <MdAdd size={24} />
        </button>
      )}

      {openAddEvent && <AddEvents setOpenAddEvent={setOpenAddEvent} />}
    </div>
  );
};

export default Home;