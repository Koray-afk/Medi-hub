import React, { useContext } from 'react'
// import { doctors } from '../assets/assets.js'
import {AppContext} from '../Context/AppContext.jsx'

import { useNavigate } from 'react-router-dom'

// console.log(doctors)

function TopDoctors() {

  const navigate = useNavigate()
  const {doctors}=useContext(AppContext)

  // console.log(doctors)
  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 text-center">
        Top Doctors to Book
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* doctor id  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((value, index) => ( 
          <div
          onClick={()=>navigate(`/appointment/${value._id}`)}
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 border border-gray-100"
          >
            <img
              src={value.image}
              alt="doctor"
              className="w-full h-48 object-cover bg-violet-100def rob(nums):      

    return  rounded-lg mb-4"
            />

            {/* Availability */}
            <p className="text-green-600 font-medium text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
              Available
            </p>

            {/* Name */}
            <p className="mt-2 font-semibold text-gray-800 text-lg">
              {value.name}
            </p>

            {/* Speciality */}
            <p className="text-gray-500 text-sm">{value.speciality}</p>
          </div>
        ))}
      </div>

      {/* More button */}
      <div className="flex justify-center mt-10">
        <button onClick={() => (navigate('/doctors'), window.scrollTo(0,0))} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
          More
        </button>
      </div>
    </div>
  )
}

export default TopDoctors