import React, { useEffect, useState } from 'react'
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate } from 'react-router';

const ForgetPassword = () => {
    const [sentOtp,setSentOtp] = useState(false);
    const [time,setTime] = useState("05.00");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const startTimer = () =>{
        let timeLeft = 300;
        const counDownInterval = setInterval(()=>{
            const minutes = Math.floor(timeLeft/60);
            const seconds = timeLeft % 60;

            const formatMinutes = String(minutes).padStart(2,"0")
            const formatSeconds = String(seconds).padStart(2,"0")
            setTime(` ${formatMinutes}.${formatSeconds} `);

            if(timeLeft <=0){
                clearInterval(counDownInterval)
                setTime("05.00")
            }
            timeLeft --;
        },1000)
    }

    const handleSendOtp = async() =>{
        try{
            if(!email){
                return console.log("EMail is required");
            }
            const response = await axiosInstance.post("/api/forget-password/send-otp",{email:email})
            if(response.status === 200){
                console.log(response.data.message);
                setSentOtp(true);
                startTimer();
            }
        } catch(error){
            console.log(error.response.data.message);
        }
    }

    const handleVerifyOtp = async(e) =>{
        e.preventDefault();
        try{
            const otp = e.target.otp.value;
            if(!otp){
                return console.log("OTP is required");
            }
            const response = await axiosInstance.post("/api/forget-password/verify-otp",{email:email,otp:otp});
            if(response.status === 200){
                console.log(response.data.message);

            }
            navigate("/reset-password");
            setSentOtp(false);
            setTime("05.00");
            localStorage.setItem("verify-email",email);
        } catch(error){
            console.log(error.response.data.message);
        }
    }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
            <div className='w-96 flex items-center h-96 flex-col gap-8 shadow-lg rounded-sm px-4 py-2'>
                <div className='text-center'>
                <h1 className='font-bold md:text-2xl text-2xl'>Forget Password</h1>
                </div>
                <form className='flex justify-between items-center flex-col gap-' onSubmit={handleVerifyOtp}>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-light text-sm'>Email</label>
                    <input type="email"  id='email' onChange={(e)=> setEmail(e.target.value)} value={email} name='email' placeholder='Enter a Email' className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm'/>
                    {sentOtp ? <p className='text-sm font-light self-end cursor-pointer'>OTP Sent</p>
                    :<p onClick={handleSendOtp} className='text-sm font-light self-end cursor-pointer'>Send OTP</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor="otp" className='font-light text-sm'>OTP</label>
                    <input placeholder='Enter a OTP' type="text"   id='otp' name='otp' className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm' />
                    {<p className='text-sm font-light'>{time}</p>}
                    </div>
                    <button className='bg-cyan-600 mt-5 hover:bg-cyan-700 px-8 py-2 rounded-lg font-bold'>Verify</button>
                </form>
                
            </div>
        </div>
  )
}

export default ForgetPassword