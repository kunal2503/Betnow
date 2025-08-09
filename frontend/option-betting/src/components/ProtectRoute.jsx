import React from "react";
import { Navigate } from "react-router";

const ProtectRoute = ({children}) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");


    if(!user || !token){
        return <Navigate to={"/login"}/>
    }

    return children
}

export default ProtectRoute;