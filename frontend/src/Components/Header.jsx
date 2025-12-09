import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 bg-gray-50">
      
      {/* Left Section */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <div>
          <p className="text-3xl md:text-4xl font-bold text-gray-800">Book Appointment</p>
          <p className="text-2xl md:text-3xl font-semibold text-blue-600 mt-2">With Trusted Doctors</p>
        </div>

        <div className="flex items-center gap-4 justify-center md:justify-start">
          <img className="w-24 md:w-32" src={assets.group_profiles} alt="group images" />
          <p className="text-gray-600 text-sm md:text-base">
            Simply browse through our extensive list of trusted doctors,< br className='hidden sm:block' />
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* Button */}
        <a 
          href="#speciality" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="arrow" className="w-5" />
        </a>
      </div>

      {/* Right Section*/}
      <div className="flex-1 mt-10 md:mt-0">
        <img className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto" src={assets.header_img} alt="header" />
      </div>
    </div>
  )
}

export default Header
