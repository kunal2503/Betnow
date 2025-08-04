import React, { useState, useEffect } from "react";
import UserBettingCard from "../components/UserBettingCard";
import { MdAdd } from "react-icons/md";
import AddEvents from "../components/AddEvents";
import axiosInstance from "../../utils/axiosInstance";
import AdminBettingCard from "../components/AdminBettingCard";

const Home = () => {
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [event, setEvent] = useState([]);

  const [user, setUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("user"));

  const userInfo = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/profile/get-user-info/${userId.id}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const eventData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/event/all-events");
      setEvent(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userInfo();
    eventData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5 m-10">
      {event.map((eventItem) => (
        user.role === "admin" ? (
          <AdminBettingCard event={eventItem}/>
        ) : (
          <UserBettingCard event={eventItem} userId={user._id} />
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
