import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import BetOrders from '../components/BetOrders';
import { useUser } from '../context/UserProvider';

const Orders = () => {
  const {user} = useUser();
  const [orders,setOrders] = useState([]);

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
  console.log(orders)
    return (
    <div className='flex flex-col justify-center w-full m-10'>
      <BetOrders orders={orders}/> 
    </div>
  )
}

export default Orders