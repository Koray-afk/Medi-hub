import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'


function RelatedDoctors({docId,speciality}) {
    // get all the doctors 
    const {doctors}=useContext(AppContext)
    const[relDoc,setRelDoc]=useState([])
    const navigate = useNavigate()

    // Fucntionality to filter the doctors and store them in the relDoc variable 
    


    //Use effect is like kab is function ko chalana hai uar kab nhi 
    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((value)=> value.speciality===speciality & value._id!==docId)
            setRelDoc(doctorsData)
        }

    },[speciality,docId,doctors])

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 bg-white">
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-700 mb-6 text-center">
      Top Doctors to Book
    </h1>
    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
      Simply browse through our extensive list of trusted doctors.
    </p>
  
    {/* doctor cards grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {relDoc.slice(0, 5).map((value, index) => (
        <div
          onClick={() => {navigate(`/appointment/${value._id}`);window.scroll(0,0)}}
          key={index}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-gray-100 flex flex-col"
        >
  
          <div className="w-full h-56 overflow-hidden rounded-t-xl">
            <img
              src={value.image}
              alt="doctor"
              className="w-full h-full object-cover"
            />
          </div>
  
        
          <div className="p-4 flex flex-col flex-grow">
            <p className="text-green-600 font-medium text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
              Available
            </p>
  
            <p className="mt-2 font-semibold text-gray-800 text-lg">
              {value.name}
            </p>
  
            <p className="text-gray-500 text-sm">{value.speciality}</p>
          </div>
        </div>
      ))}
    </div>
  
    
    <div className="flex justify-center mt-10">
      <button
        onClick={() => (navigate("/doctors"), window.scrollTo(0, 0))}
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        More
      </button>
    </div>
  </div>
  )
}

export default RelatedDoctors
