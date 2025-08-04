import React, { useEffect, useState } from "react";

const UserBettingCard = ({event,userId}) => {
  const [quantity,setQuantity] = useState("")
  const [bettingData, setBettingData] = useState({
    userId : userId,
    eventId : event._id,


  })
  
  const handleBetClick = (e) => {
      
  }
  
  return (
    <div className="flex flex-col px-8 py-6 gap-4 rounded-md items-center justify-center w-full sm:w-2/3 md:w-1/2 shadow-md bg-white hover:shadow-lg">
    <p className="font-bold text-xl text-center text-gray-800">
    {event.title}
    </p>
    <div className="flex gap-5">
      <span className="font-semibold">Select QTY:</span>
      <input type="number" value={quantity} onChange={(e)=> setQuantity(e.target.value)} min={1} className="w-10 border border-gray-600 text-center focus:outline-none rounded-sm focus:border-black"/>
    </div>
    <div className="flex items-center gap-10">
    <button onClick={handleBetClick} className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-500 hover:rounded-full focus:outline-none">
    Yes {event.yesPrice}
    </button>
    <button onClick={handleBetClick} className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-500 hover:rounded-full focus:outline-none">
    No {event.noPrice}
    </button>
    </div>
    </div>
  
  );
};

export default UserBettingCard;
