import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import {assets} from "../../assets/assets"

function Dashboard() {

  const{dashData,adminData,atoken}=useContext(AdminContext)

  useEffect(()=>{
    dashData()
    console.log(adminData)
  },[atoken])

  

  return (
    <div className="p-6 space-y-8">
  
      {/* TOP HEADING */}
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
  
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  
        {/* Doctors */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <img className="w-16 mb-3 opacity-90" src={assets.doctor_icon} alt="" />
          <p className="text-gray-500 text-sm mb-1">Total Doctors</p>
          <h2 className="text-4xl font-bold text-blue-600">{adminData?.doctors}</h2>
        </div>
  
        {/* Patients */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <img className="w-16 mb-3" src={assets.patients_icon} alt="" />
          <p className="text-gray-500 text-sm mb-1">Total Patients</p>
          <h2 className="text-4xl font-bold text-green-600">{adminData?.patients}</h2>
        </div>
  
        {/* Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <img className="w-16 mb-3" src={assets.appointments_icon} alt="" />
          <p className="text-gray-500 text-sm mb-1">Appointments</p>
          <h2 className="text-4xl font-bold text-purple-600">{adminData?.appointment}</h2>
        </div>
  
        {/* Recent */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <img className="w-16 mb-3" src={assets.list_icon} alt="" />
          <p className="text-gray-500 text-sm mb-1">Recent Appointments</p>
          <h2 className="text-4xl font-bold text-orange-600">
            {adminData?.latestAppointment?.length}
          </h2>
        </div>
  
      </div>
  
      {/* LATEST APPOINTMENTS */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest Appointments</h2>
  
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
  
            {/* TABLE HEAD */}
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
  
            {/* TABLE BODY */}
            <tbody>
              {adminData?.latestAppointment?.map((item, index) => {
                const userImage = item.userData?.image || assets.default_user;
                const docImage = item.docData?.image || assets.default_doctor;
  
                return (
                  <tr key={index} className="border-b hover:bg-gray-50 text-gray-700">
  
                    {/* Patient Info */}
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={userImage}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold">{item.userData?.name}</p>
                        <p className="text-xs text-gray-500">{item.userId}</p>
                      </div>
                    </td>
  
                    {/* Doctor Info */}
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={docImage}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold">{item.docData?.name}</p>
                        <p className="text-xs text-gray-500">{item.docId}</p>
                      </div>
                    </td>
  
                    {/* Date */}
                    <td className="p-3 font-medium">
                      {item.slotDate.replace(/_/g, "/")}
                    </td>
  
                    {/* Time */}
                    <td className="p-3 font-medium">{item.slotTime}</td>
  
                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full 
                          ${item.cancelled
                            ? "bg-red-100 text-red-600"
                            : item.isCompleted
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                          }`}
                      >
                        {item.cancelled
                          ? "Cancelled"
                          : item.isCompleted
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
  
          </table>
        </div>
      </div>
  
    </div>
  );
}

export default Dashboard;
