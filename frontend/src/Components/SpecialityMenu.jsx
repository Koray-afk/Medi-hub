import React from 'react'
import { specialityData } from '../assets/assets.js'
import { Link } from 'react-router-dom'

function SpecialityMenu() {
  return (
    <div id='speciality' className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Find the Speciality</h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          Simply browse through our extensive list of trusted doctors, 
          schedule your appointment hassle-free.
        </p>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {specialityData.map((value, index) => (
          <Link 
            key={index} 
            to={`/doctors/${value.speciality}`} 
            className="group flex flex-col items-center justify-center text-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-100 transition mb-4">
              <img 
                src={value.image} 
                alt={value.speciality} 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="font-medium text-gray-700 group-hover:text-blue-600 transition">
              {value.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu