import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../Components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();  
  const { doctors, currency, backend_Url , getDoctors,token } = useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [docInfo, setDoctInfo] = useState(null);
  const [docSlot, setdocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate()

  console.log(docId)
  console.log(docInfo)


  // now we have to fetch the following doctor info with the perticular id
  const fetchDocInfo = async () => {
    const doc = doctors.find((doct) => doct._id === docId);
    setDoctInfo(doc);
  };

  //Function for available slots
  const getAvailableSlots = async () => {
    setdocSlot([]);
    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      console.log(currentDate, today);

      currentDate.setDate(today.getDate() + i);

      //Setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // set start time 
      if (i === 0) {
        // Today: start from next 30-minute slot
        const minutes = currentDate.getMinutes();
        if (minutes < 30) {
          currentDate.setMinutes(30);
        } else {
          currentDate.setMinutes(0);
          currentDate.setHours(currentDate.getHours() + 1);
        }
      } else {
        // Future days: start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlot = [];

      while (currentDate < endTime) {

        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Now we will check if the doctor slot is already occupied then dont show that date and time 
        const day = currentDate.getDate()
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year 
        const slotTime = formattedTime

        const isSlotAvialable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true 
         
        if(isSlotAvialable){
          // Add slot to array
          timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }

        // Increase time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setdocSlot((prev) => [...prev, timeSlot]);
    }
  };

  const bookAppointments = async()=>{
    if(!token){
      toast.warn('Login to book Appointment')
      return navigate('/login')
    }

    try{
      const date = docSlot[slotIndex][0].datetime
      console.log(docSlot)
      console.log(docSlot[slotIndex])
      console.log(docSlot[slotIndex][0])
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year 
      
      // Now we have to make a api call to book appointments 
      const {data} = await axios.post(`${backend_Url}/api/user/bookAppointment`,{docId,slotDate,slotTime},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getDoctors()
        navigate('/myAppointment')
      }
      else{
      
        toast.error(data.error)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
    
  }


  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  //Now we have to use this data to display the doctor profile

  return (
    docInfo && (
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Doctor Image */}
          <div className="w-full sm:w-1/3">
            <img
              src={docInfo.image}
              alt="doctor image"
              className="w-full h-auto bg-pink-50 rounded-xl shadow-md object-cover"
            />
          </div>

          {/* doctor information */}
          <div className="flex-1 space-y-4">
            {/* Name + verified */}
            <p className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
              {docInfo.name}
              <img
                src={assets.verified_icon}
                alt="verified"
                className="w-5 h-5"
              />
            </p>

            {/* Degree + speciality + experience */}
            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <p className="text-lg font-medium">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="px-3 py-1 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium">
                {docInfo.experience}
              </button>
            </div>

            {/* About */}
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                About{" "}
                <img src={assets.info_icon} alt="info" className="w-4 h-4" />
              </p>
              <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>

            {/* Fees */}
            <p className="text-gray-800 font-medium">
              Appointment fee:{" "}
              <span className="text-violet-700 font-semibold">
                {currency}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* Booking slots  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
            {docSlot.length &&
              docSlot.map((value, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-purple-600 text-white"
                      : "border border-gray-200"
                  } `}
                  key={index}
                >
                  <p>{value[0] && daysOfWeek[value[0].datetime.getDay()]}</p>
                  <p>{value[0] && value[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 width-full overflow-x-scroll mt-4">
            {docSlot.length &&
              docSlot[slotIndex].map((value, index) => (
                <p
                  onClick={() => setSlotTime(value.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    value.time === slotTime
                      ? "bg-purple-600 text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  {value.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button onClick={bookAppointments} className="px-6 mt-4 mb-10 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out">
            Book Appointment
          </button>
        </div>
        {/* Listing related doctors  */}
          <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>  
        
      </div>
    )
  );
}

export default Appointment;
