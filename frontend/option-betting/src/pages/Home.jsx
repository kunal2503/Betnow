import React, { useState, useEffect } from "react";
import UserBettingCard from "../components/UserBettingCard";
import { MdAdd, MdRefresh } from "react-icons/md";
import AddEvents from "../components/AddEvents";
import axiosInstance from "../../utils/axiosInstance";
import AdminBettingCard from "../components/AdminBettingCard";
import { useUser } from "../context/UserProvider";

const Home = () => {
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  const eventData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/event/all-events");

      // Sort by event creation date
      const sortedEvents = (response.data.events || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setEvents(sortedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    eventData();
    const interval = setInterval(eventData, 2000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex flex-col items-center justify-center gap-5 m-10 w-full">
      {/* Refresh button */}
      <div
        className="absolute right-10 top-30 bg-blue-500 hover:bg-blue-600 text-white px-2 rounded-sm cursor-pointer"
        onClick={eventData}
      >
        <MdRefresh size={30} />
      </div>

      {/* Events */}
      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events available.</p>
      ) : user.role === "admin"  ? (
        events.map((event)=>(
          <AdminBettingCard event={event}/>
        ))
      ) : (
        // Users → show only live events
        events
          .filter((event) => event.status === "live")
          .map((event) => (
            <UserBettingCard key={event._id} event={event} userId={user._id} />
          ))
      )}

      {/* Add Event Button (only for admin) */}
      {user.role === "admin" && (
        <button
          onClick={() => setOpenAddEvent(true)}
          className="bg-blue-500 hover:bg-blue-600 fixed bottom-8 right-8 p-2 rounded-full shadow-lg text-white"
          aria-label="Add Event"
        >
          <MdAdd size={30} />
        </button>
      )}

      {/* Add Event Modal */}
      {openAddEvent && <AddEvents setOpenAddEvent={setOpenAddEvent} />}
    </div>
  );
};

export default Home;
