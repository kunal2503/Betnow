import React from "react";

const AdminBettingCard = ({event}) => {

  return (
    <div className="flex flex-col px-6 py-4  rounded-sm transition-all duration-200  gap-2 shadow-sm hover:shadow-lg w-[50%]">
        <h1  className="text-lg font-bold">{event.title}</h1>
        <p className="text-gray-600">{event.description}</p>
        <div className="flex gap-4">
        <p className=" font-semibold">Category: {event.category}</p>
        <p className="font-semibold">Status: {event.status}</p>
        <p className="font-semibold">Created At: {event.startTime}</p>
        </div>
        <div className="flex gap-4">
            <span>TotalYesBets Amount: {event.totalYesAmount}</span>
            <span>TotalNoBets Amount: {event.totalNoAmount}</span>
        </div>
        <div className="flex gap-4">
            <span>Current Yes Price: {event.yesPrice}</span>
            <span>Curretn No Price: {event.noPrice}</span>
        </div>
        <form className="flex gap-4 items-center">
        <span className="font-semibold">Result Declear:</span>

        <select name="" id="" className="text-center px-4 py-2 border border-gray-600 rounded-sm focus:border-gray-black">
            <option value="">Declear Result</option>
            <option value="">yes</option>
            <option value="">no</option>
            <option value="">cancelled</option>
        </select>
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-sm">Declear</button>
        </form>

    </div>
  );
};

export default AdminBettingCard;
