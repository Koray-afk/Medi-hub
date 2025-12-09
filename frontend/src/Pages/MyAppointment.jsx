import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyAppointment() {
  const { backend_Url , token } = useContext(AppContext);
  const[appointment,setAppointment]=useState([])
  const navigate = useNavigate()

  const listAppointment = async()=>{
    try{
      const {data}= await axios.get(`${backend_Url}/api/user/listAppointment`,{headers:{token}})
      if(data.success){
        setAppointment(data.appointment.reverse())
        console.log(data.appointment)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId)=>{
    try{
      const {data}= await axios.post(`${backend_Url}/api/user/cancelAppointment`,{appointmentId},{headers:{token}} )

      if(data.success){
        toast.success(data.message)
        listAppointment()
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

  const initPay = (order)=>{

    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:"Appointment payment",
      order_id:order.id,
      receipt:order.receipt,
      //now we have to add a handler
      handler:async(response)=>{
        console.log(response)
        try{
          const {data}=await axios.post(`${backend_Url}/api/user/verifyRazorpay`,response,{headers:{token}})
          if(data.success){
            listAppointment()
            navigate('/MyAppointment')
          }
        }
        catch(error){
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rxp = new window.Razorpay(options)
    rxp.open()
  }

  // function for payment gateway 
  const paymentRozarpay = async(appointmentId)=>{
    try{
      const {data} = await axios.post(`${backend_Url}/api/user/paymentRazorpay`,{appointmentId},{headers:{token}})

      if(data.success){
        console.log(data.order)
        initPay(data.order)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      listAppointment()
    }
  },[token])

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-md">
      <p className="pb-3 text-xl font-semibold text-gray-800 border-b border-gray-200">
        My Appointments
      </p>

      <div className="mt-6 space-y-5">
        {appointment.slice(0, 3).map((value, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 bg-indigo-50"
                src={value.docData.image}
                alt="doctor"
              />
            </div>

            {/* Appointment Info */}
            <div className="flex-1 text-sm text-gray-600">
              <p className="text-lg font-semibold text-gray-800">
                {value.docData.name}
              </p>
              <p className="text-indigo-500 font-medium">{value.docData.speciality}</p>

              <div className="mt-2">
                <p className="text-gray-700 font-medium">Address:</p>
                <p>{value.docData.address.line1}</p>
                <p>{value.docData.address.line2}</p>
              </div>

              <p className="mt-2 text-gray-700 font-medium">
                Date & Time:
                <span className="ml-1 text-gray-600 font-normal">
                  {value.slotDate}| {value.slotTime}
                </span>
              </p>
            </div>

  
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              {!value.cancelled && value.payment && <button className="px-4 py-1 text-sm font-semibold bg-blue-500 text-white rounded-md shadow-sm">Paid</button>}
              {!value.cancelled && !value.payment && 
              <button onClick={()=>paymentRozarpay(value._id)} className="w-full sm:w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm">
                Pay Online
              </button>}
  
              {!value.cancelled &&  <button onClick={()=>cancelAppointment(value._id)} className="w-full sm:w-40 bg-red-100 hover:bg-red-200 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm">
                Cancel Appointment
              </button>}
              {value.cancelled && <button className="py-2 text-grey-300">Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointment;