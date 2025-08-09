import React, { useContext, createContext, useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);


  const getUserInfo = async()=>{
    try{
      const response = await axiosInstance.get(`/api/profile/user-info/${userId.id}`)  
      console.log(response.data.user)
      setUser(response.data.user);
    } catch(error){
      toast.error(error.response.data.message)
    }
  }
  console.log(user)
  useEffect(() => {
    getUserInfo()
    const loaclToken = JSON.parse(localStorage.getItem("token"));
    if (loaclToken ) {
    setToken(loaclToken)
    }
  }, []);

  return (
    <UserContext.Provider value={{ user,token,setUser,setToken}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)