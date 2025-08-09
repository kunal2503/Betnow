import React, {  useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const UserBettingCard = ({event,userId}) => {
  const [quantity,setQuantity] = useState("")
  const navigate = useNavigate();
  

  const handleBetPlace = async(betSide) => {
    const betData = ({
    userId : userId,
    eventId : event._id,
    betSide : betSide,
    quantity :  Number(quantity),
    }) 
      try{
        const response = await axiosInstance.post("/api/bet/place-bet",betData);
        navigate("/")
        toast.success("Order placed successfully")
      } catch(error){
        toast.error(error.response.data.message);
        console.log(error.response.data.message)
      }
  }

  return (
    <div className="flex flex-col w-full max-w-md p-8 gap-2 rounded-2xl items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300">
  <p className="font-bold text-xl text-center text-gray-800">
    {event.title}
  </p>

  <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
    <label className="font-semibold text-gray-700 flex-shrink-0">Select Quantity:</label>
    <input
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      min={1}
      className="w-20 border border-gray-300 text-center py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
    {/* {quantity > 0 && (
  <div className="text-gray-600 text-sm text-center">
    {quantity.length<=1  ?<span className="font-semibold">₹{quantity * event.yesPrice}</span> : <span className="font-semibold">₹{quantity * event.noPrice}</span>}
  </div>
)} */}

  </div>

  <div className="flex items-center justify-between gap-6 w-full mt-2">
    <button
      onClick={() => handleBetPlace("yes")}
      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 focus:outline-none text-center"
    >
      Yes ₹{event.yesPrice}
    </button>
    <button
      onClick={() => handleBetPlace("no")}
      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 focus:outline-none text-center"
    >
      No ₹{event.noPrice}
    </button>
  </div>
</div>

  );
};

export default UserBettingCard;
