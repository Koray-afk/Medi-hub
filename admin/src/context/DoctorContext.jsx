import axios from "axios";
import { createContext, useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
export const DoctorContext = createContext()

// Now make a provider 
const DoctorContextProvider =(props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const[dtoken,setDtoken]=useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):"")
    const[appointments,setAppointments]=useState([])

    const getAllAppointment = async()=>{
        try{
            const {data} = await axios.get(`${backendUrl}/api/doctor/appointmentsDoctor`,{headers:{dtoken}})
            if(data.success){
                setAppointments(data.allAppointments.reverse())
                console.log(data.allAppointments.reverse())
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

    



    const value ={
        dtoken,setDtoken,backendUrl,appointments,setAppointments,getAllAppointment
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;