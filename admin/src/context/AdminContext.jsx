import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext()

// Now make a provider 
const AdminContextProvider =(props)=>{

    const[atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const[doctor,setDoctor]=useState([])
    const[appointments,setAppointments]=useState([])
    const[adminData,setAdminData]=useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    // console.log(backendUrl)
    // console.log(atoken)


    const getAllDoctor = async()=>{
        try{
            const {data} = await axios.post(`${backendUrl}/api/admin/allDoctor`,{},{headers: {
                authorization: atoken, // send as 'authorization' header
              },})

              // axios.post(url, data, config)
            
            //   console.log(data)

            if(data.success){
                setDoctor(data.allDoctors)
                console.log(data.allDoctors)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error)
        }
    }

    const getAllAppointment = async()=>{
        try{
            const {data} = await axios.get(`${backendUrl}/api/admin/allAppointment`,{headers:{authorization:atoken}})

            if(data.success){
                console.log(data.allAppointments)
                setAppointments(data.allAppointments)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentCancel = async(appointmentId)=>{
        try{
            const {data} = await axios.post(`${backendUrl}/api/admin/appointmentCancel`,{appointmentId},{headers:{authorization:atoken}})

            if(data.success){
                toast.success(data.message)
                getAllAppointment()
            }
            else{
                toast.message(data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const dashData = async()=>{
        try{
            const {data}= await axios.get(`${backendUrl}/api/admin/adminDashboard`,{headers:{authorization:atoken}})

            if(data.success){
                toast.success(data.cussess)
                setAdminData(data.dashData)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const value ={
        atoken,setAtoken,backendUrl,doctor,getAllDoctor,getAllAppointment,appointments,appointmentCancel,dashData,adminData,setAdminData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider