import React, { useState } from 'react'

const Orders = () => {
  const [orders,setOrders] = useState("");
  return (
    <div className=' flex items-center justify-center'>
      {orders ? (
        <div>

        </div>
      )
       : <p>No orders yet</p>}
    </div>
  )
}

export default Orders