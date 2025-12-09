import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
  {/* Title */}
  <div className="text-center text-3xl md:text-3xl font-bold text-gray-800 mb-10">
    CONTACT US
  </div> 

  {/* Content */}
  <div className="flex flex-col md:flex-row items-center gap-12">
    {/* Image */}
    <div className="w-full md:w-1/2">
      <img
        src={assets.contact_image}
        alt="contact-image"
        className="w-full h-aut rounded-xl shadow-md object-cover"
      />
    </div>

    {/* Contact Info */}
    <div className="flex flex-col gap-6 md:w-1/2 text-gray-700 text-sm">
      <p className='text-shadow-black text-xl font-bold'>OUR OFFICE</p>
      <p className="text-gray-800 font-semibold">
        245 Willms Station <br /> Suite 000, Washington, USA
      </p>
      <p>
        Tel: (912) 563-0001 <br /> Email: abhiman@gmail.com
      </p>
      <p className="text-gray-800 font-semibold mt-4">CAREERS AT PRESCRIPTO</p>
      <p>Learn more about our teams and job openings.</p>
      <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-300 w-max">
        Explore Jobs
      </button>
    </div>
  </div>
</div>
  )
}

export default Contact
