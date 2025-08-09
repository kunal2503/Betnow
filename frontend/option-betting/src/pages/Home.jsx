import React, { useState, useEffect } from "react";
import UserBettingCard from "../components/UserBettingCard";
import { MdAdd } from "react-icons/md";
import AddEvents from "../components/AddEvents";
import axiosInstance from "../../utils/axiosInstance";
import AdminBettingCard from "../components/AdminBettingCard";
import { useUser } from "../context/UserProvider";

const Home = () => {
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [event, setEvent] = useState([]);

  const {user} = useUser()

  const eventData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/event/all-events");
      setEvent(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    eventData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-5 m-10">
      {event.map((eventItem) => (
        user.role === "admin" ? (
          <AdminBettingCard key={eventItem._id} event={eventItem}/>
        ) : (
          <UserBettingCard key={eventItem._id} event={eventItem} userId={user._id} />
        )
      ))}

      {user.role === "admin" ? (
        <MdAdd
          onClick={() => setOpenAddEvent(true)}
          className="bg-blue-500 hover:bg-blue-600 fixed bottom-[20%] right-[10%] rounded-sm text-white font-bold"
          size={30}
        />
      ) : null}
      {openAddEvent ? <AddEvents setOpenAddEvent={setOpenAddEvent} /> : null}
    </div>
  );
};

export default Home;
