import React,{ useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate} from "react-router"
import toast from "react-hot-toast";

const SellConfirm = ({order,handleCloseModel})=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleConfirm = async (e) =>{
        e.preventDefault();
        try{
            const response = await axiosInstance.post(`/api/bet/sell-bet/${order._id}`)
                // handleCloseModel();
                navigate("/orders")
                toast.success("Sell Successfully");
        } catch(error){
            toast.error("Error processing sell");
            console.log(error)
        } 
    }
    
    return(
        <div className="fixed flex items-center justify-center bg-white ">
            <form className="w-[100%] flex flex-col shadow-sm px-4 rounded-lg py-2 gap-2">
            <h1 className="font-bold text-center text-xl">Confirm to Sell</h1>
            <div className="flex flex-col items-center justify-center">
            <p className="text-sm">Are you sure you want to sell your bet on </p>
            <span className="font-bold">{order.eventName}?</span>
            </div>
            <div className="flex items-center justify-center gap-4">
            <button className="bg-gray-100 font-bold text-black rounded-lg hover:bg-gray-200 px-8 py-2" onClick={handleCloseModel}>Cancle</button>
            <button className="bg-red-500 font-bold text-black rounded-lg hover:bg-red-600 px-8 py-2" onClick={handleConfirm}>{loading ? "Selling" : "Confirm Sell"}</button>
            </div>
            </form>
        </div>
    )
}

export default SellConfirm;