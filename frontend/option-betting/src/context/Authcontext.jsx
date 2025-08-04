import { useState , useContext,createContext, useEffect } from "react";

// creating context
const AuthContext = createContext();

//Provider Component
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const setUserInfo = () =>{
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
    }

    const setUserToken = () => {
        const userToken = JSON.parse(localStorage.getItem("token"))
        setToken(userToken);
    }
    // useEffect(()=>{
        // setUserInfo();
        // setUserToken();
    // },[user,token])

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{user,token,logout}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);