import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

function Sidebar() { 
  const { atoken } = useContext(AdminContext)
  const { dtoken } = useContext(DoctorContext)

  return (
    <div>
      {atoken && (
        <ul
          className="
            fixed left-0 top-16
            h-[calc(100vh-4rem)]
            w-60 
            bg-white border-r border-gray-200 
            flex flex-col items-start p-5 
            shadow-md z-40
            overflow-y-auto
          "
        >
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg 
               text-gray-700 hover:bg-blue-50 hover:text-blue-600 
               transition-colors duration-200 ${
                 isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
               }`
            }
          >
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg 
               text-gray-700 hover:bg-blue-50 hover:text-blue-600 
               transition-colors duration-200 ${
                 isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
               }`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg 
               text-gray-700 hover:bg-blue-50 hover:text-blue-600 
               transition-colors duration-200 ${
                 isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
               }`
            }
          >
            <img src={assets.add_icon} alt="" className="w-5 h-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg 
               text-gray-700 hover:bg-blue-50 hover:text-blue-600 
               transition-colors duration-200 ${
                 isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
               }`
            }
          >
            <img src={assets.people_icon} alt="" className="w-5 h-5" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}
      {dtoken && (
        <ul
          className="
            fixed left-0 top-16
            h-[calc(100vh-4rem)]
            w-60 
            bg-white border-r border-gray-200 
            flex flex-col items-start p-5 
            shadow-md z-40
            overflow-y-auto
          "
        >
          <NavLink
            to="/doctorDashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg 
               text-gray-700 hover:bg-blue-50 hover:text-blue-600 
               transition-colors duration-200 ${
                 isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
               }`
            }
          >
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctorAppointment"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg 
               text-gray-700 hover:bg-blue-50 hover:text-blue-600 
               transition-colors duration-200 ${
                 isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
               }`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/doctorProfile"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg 
               text-gray-700 hover:bg-blue-50 hover:text-blue-600 
               transition-colors duration-200 ${
                 isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
               }`
            }
          >
            <img src={assets.people_icon} alt="" className="w-5 h-5" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar