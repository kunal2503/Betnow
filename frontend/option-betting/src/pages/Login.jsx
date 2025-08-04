import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    });
    const navigate = useNavigate();

    const handleChanges = (e)  => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await axiosInstance.post("/api/auth/login",formData);
            localStorage.setItem("user",JSON.stringify(response?.data?.user))
            localStorage.setItem("token",JSON.stringify(response?.data?.token))
            console.log(response.data.user);
            navigate("/")
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <div className='w-96 flex items-center h-96 flex-col gap-8 shadow-lg rounded-sm px-4 py-2'>
            <div className='text-center'>
            <h1 className='font-bold md:text-4xl text-2xl'>Login</h1>
            </div>
            <form className='flex justify-between items-center flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-light text-sm'>Email</label>
                <input type="email" onChange={handleChanges} value={formData.email}  id='email' name='email' className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm'/>
                </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-light text-sm'>Password</label>
                <input type="password" onChange={handleChanges} value={formData.password}  id='password' name='password' className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm' />
                <p className='self-end hover:text-blue-600 font-semibold'><Link to={"/forget-password"}>Forget password</Link></p>
                </div>
                <button className='bg-cyan-600 mt-2 hover:bg-cyan-700 px-8 py-2 rounded-lg font-bold'>Login</button>
            </form>
            <div>
                <p>Not have account <Link to={"/signup"} className='font-bold text-sm text-blue-600'>Signup</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login