import React,{useState} from 'react'
import { Link,  useNavigate } from 'react-router'
import axiosInstance  from "../../utils/axiosInstance"

const Signup = () => {
    const [formData, setFormData] = useState({
            username : "",
            email : "",
            password : ""
        });
        const navigate = useNavigate();
    
        const handleChanges = (e)  => {
            setFormData({...formData, [e.target.name]:e.target.value});
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault()
            if(!formData.username || !formData.email || !formData.password){
                return console.log("Please fill all fields");
            }
            try{
                const response = await axiosInstance.post("/api/auth/signup",formData);
                console.log(response.data.user);
                localStorage.setItem("user",JSON.stringify(response.data.user));
                localStorage.setItem("token",JSON.stringify(response.data.token)); 
                
                navigate("/")
            } catch(error){
                console.log(error);
            }
        }

   return (
       <div className='flex items-center justify-center w-screen h-screen'>
           <div className='w-96 flex items-center h-96 gap-4 flex-col  shadow-lg rounded-sm px-4 py-2'>
               <div className='text-center'>
               <h1 className='font-bold md:text-4xl text-2xl'>Signup</h1>
               </div>
               <form className='flex justify-between items-center flex-col' onSubmit={handleSubmit}>
                   <div className='flex flex-col gap-1'>
                   <label htmlFor="username" className='font-light text-sm'>Username</label>
                   <input type="username" onChange={handleChanges} value={formData.username}  id='username' name='username' className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm'/>
                   </div>
                   <div className='flex flex-col gap-1'>
                   <label htmlFor="email" className='font-light text-sm'>Email</label>
                   <input type="email" onChange={handleChanges} value={formData.email} id='email' name='email' className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm'/>
                   </div>
                   <div className='flex flex-col gap-1'>
                   <label htmlFor="password" className='font-light text-sm'>Password</label>
                   <input type="password" onChange={handleChanges} value={formData.password}  id='password' name='password' className='focus:outline-none px-8 py-2 border border-gray-700 rounded-sm' />
                   </div>
                   <button className='bg-cyan-600 mt-4 hover:bg-cyan-700 px-8 py-2 rounded-lg font-bold'>Signup</button>
               </form>
               <div className='mt-2'>
                   <p>Not have account <Link to={"/login"} className='font-bold text-sm text-blue-600'>Login</Link></p>
               </div>
           </div>
       </div>
     )
}

export default Signup