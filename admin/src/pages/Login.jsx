import React, { useState } from "react";
// import { assets } from "../assets/assets.js";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";


function Login() {
  const [state, setState] = useState("Admin");
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const  {setAtoken,backendUrl} = useContext(AdminContext)
  const {setDtoken}=useContext(DoctorContext)
  const navigate = useNavigate()

  // We have taken the backend URL because by using this we can hit the api 


  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    try{
        if(state==='Admin'){
            const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

            // console.log(data)
            if(data.success){
                localStorage.setItem('atoken',data.token)
                setAtoken(data.token)
                navigate('/admin-dashboard')
                
                console.log(data.token)
            }
            else{
                toast.error(data.message)
            }
        }
        else{
            const {data} = await axios.post(`${backendUrl}/api/doctor/loginDoctor`,{email,password})

            if(data.success){
              localStorage.setItem('dtoken',data.token)
              setDtoken(data.token)
              toast.success(data.message)
            }
            else{
              toast.error(data.message)
            }

        }

    }
    catch(error){
        console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        {/* Title */}
        <p className="text-2xl font-semibold text-center mb-6">
          <span className="text-blue-600">{state}</span> Login
        </p>

        {/* Email */}
        <div className="mb-4">
          <p className="text-gray-600 mb-1">Email</p>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            required
            value={email}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <p className="text-gray-600 mb-1">Password</p>
          <input
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            required
            value={password}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm hover:shadow-md"
        >
          Login
        </button>

        {/* Toggle between Admin and Doctor */}
        {state === "Admin" ? (
          <p className="text-center text-gray-600 mt-4">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-blue-600 font-medium cursor-pointer hover:underline hover:text-blue-700"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-blue-600 font-medium cursor-pointer hover:underline hover:text-blue-700"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;