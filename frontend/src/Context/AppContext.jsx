import { createContext, useEffect, useState } from "react";
import React from "react"; 
// import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

// create the context and export it 
export const AppContext = createContext();

// step-02 Create a provider function 
const AppContextProvider = ({children})=>{
    
   const currency ='$' 
   const backend_Url = import.meta.env.VITE_BACKEND_URL
   const[doctors,setDoctors]=useState([])
   const [token, setToken] = useState(localStorage.getItem('token') || '');
   const[userData,setUserData]=useState(false)

   const getDoctors = async()=>{
    try{
        const {data} = await axios.get(`${backend_Url}/api/doctor/allDoctor`)
  
        if(data.success){
            setDoctors(data.allDoctors)
        }
        else{
            toast.error(data.message)
        }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }
   }


   const loadUserProfileData = async()=>{
    try{
      
        const {data} = await axios.get(`${backend_Url}/api/user/getProfile`,{headers:{token}})
        console.log(data)
        if(data.success){
            setUserData(data.userData)
        }
        else{
            toast.error(data.message)
        }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }
   }

   useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

   useEffect(()=>{
    getDoctors()
   },[])

   useEffect(()=>{
    if(token){
        loadUserProfileData()
    }
    else{
        setUserData(false)
    }
   },[token])

    const value = {doctors,currency,token,setToken,backend_Url,userData,setUserData,loadUserProfileData,getDoctors}
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

