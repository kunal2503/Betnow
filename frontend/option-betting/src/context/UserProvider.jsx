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
      setUser(response?.data?.user);
    } catch(error){
      toast.error(error.response.data.message)
    }
  }
  useEffect(() => {
    getUserInfo()
    const loaclToken = localStorage.getItem("token");
    console.log(loaclToken)
    if (loaclToken ) {
    setToken(loaclToken)
    }
  }, []);

  return (
    <UserContext.Provider value={{ user,token}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)