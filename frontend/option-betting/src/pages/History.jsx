import React,{useState} from 'react'
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useUser } from '../context/UserProvider';

const History = () => {
     const {user} = useUser() ;
    const [orders,setOrders] = useState([]);
    console.log(user._id)
  
    const getOrersData = async () => {
      try{
        const response  = await axiosInstance.get(`/api/bet/get-bet-orders/${user._id}`);
        setOrders(response.data.orders)
      } catch(error){
          console.log(error)
        }
    }

    useEffect(()=>{
getOrersData()
    },[])
   return (
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {orders
          .filter((order) => order.status === "completed")
          .map((order) => (
            <div
              key={order._id}
              className="flex flex-col w-full max-w-lg px-4 py-3 gap-2 rounded-2xl items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <p className="font-bold text-sm text-center text-gray-800">
                {order.eventName}
              </p>
              <div className="flex  gap-4">
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xs  text-gray-500">Bet Side</p>
                  <p className="">{order.betSide.toUpperCase()}</p>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xs  text-gray-500">Result</p>
                  <p className="">{order.result.toUpperCase()}</p>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xs  text-gray-500">Bet Amount</p>
                  <p className="  ">{order.amount?.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xs  text-gray-500">QTY</p>
                  <p className="">{order.quantity}</p>
                </div>
              </div>
              {order.status === "completed" ? (
                <p className="text-green-600 font-bold">Completed</p>
              ) : null}
            </div>
          ))}
        
      </div>
    );
}

export default History