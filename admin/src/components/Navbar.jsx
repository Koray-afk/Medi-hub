import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from "../context/DoctorContext";

function Navbar() {
  const { atoken, setAtoken } = useContext(AdminContext);
  const {dtoken,setDtoken} = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    if (atoken) {
      navigate('/')
      setAtoken("");
      localStorage.removeItem("atoken");
    }
    else{
      navigate('/')
      setDtoken("")
      localStorage.removeItem("dtoken")
    }
  };


 
  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 fixed top-0 left-0 w-full z-50 bg-white shadow-sm h-16"> 
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
        Medi Hub
        </h1> 
        <p className="text-lg font-medium text-gray-600 ml-2">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div> 

      {/* Right Section */}
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;