import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'
import { Navigate } from 'react-router'

const AddEvents = ({setOpenAddEvent}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [event, setEvent] = useState({
        question : "",
        category : "",
        description : "",
        createdBy : user.id
    })

    const handelChanges = (e)=>{
        setEvent({...event,[e.target.name ]: e.target.value})
    }
    const handleAddEvent = async(e) =>{
        e.preventDefault();
        try{
            const response = await axiosInstance.post("/api/admin/event/add-event",event);
            console.log(response);
            setOpenAddEvent(false);
            <Navigate to={"/"} />
        } catch(error){
            console.log(error)
        }
    }

  return (
     <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-[50%]  p-6 flex flex-col items-center gap-6 px-8 py-4">
        <MdClose className='text-2xl' onClick={()=> setOpenAddEvent(false)}/>
        <h1 className='font-bold text-2xl'>Create New Event</h1>
        <form className='flex flex-col gap-5 w-full' >
        <div className='flex flex-col'>
            <label htmlFor="question" className='font-light text-sm'>Questions</label>
            <input type="text" id='question'  onChange={handelChanges} value={event.question} name='question' placeholder='Enter a Questions' className='border px-6 border-gray-500 focus:outline-none focus:border-2 focus:border-black rounded-sm py-2'/>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="description" className='font-light text-sm'>Description</label>
            <input type="text" id='description'  onChange={handelChanges} value={event.description} name='description' placeholder='Enter a Questions' className='border px-6 border-gray-500 focus:outline-none focus:border-2 focus:border-black rounded-sm py-2'/>
        </div>
         <div className='flex flex-col'>
            <label htmlFor="category" className='font-light text-sm'>Category</label>
            <input type="text" id='category' onChange={handelChanges} value={event.category} name='category' placeholder='Enter a Category' className='border px-6 border-gray-500 focus:outline-none focus:border-2 focus:border-black rounded-sm py-2'/>
        </div>
         <button onClick={handleAddEvent} className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-sm font-bold'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddEvents