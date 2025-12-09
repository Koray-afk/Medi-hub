import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

function DoctorAppointment() {

    const{dtoken,getAllAppointment,appointments}=useContext(DoctorContext)

    useEffect(()=>{
        if(dtoken){
            getAllAppointment()
            console.log(appointments)
        }
    },[dtoken])

    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          All Appointments
        </h1>
    
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Patient</th>
                  <th className="py-3 px-4 text-left">Age</th>
                  <th className="py-3 px-4 text-left">Payment</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date & Time</th>
                  <th className="py-3 px-4 text-left">Fees</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
    
              <tbody className="text-gray-800 text-sm">
                {appointments?.map((app, index) => (
                  <tr
                    key={app._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Index */}
                    <td className="py-3 px-4">{index + 1}</td>
    
                    {/* Patient Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.userData?.image}
                          alt="patient"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-semibold">{app.userData?.name}</p>
                          <p className="text-xs text-gray-500">{app.userData?.email}</p>
                        </div>
                      </div>
                    </td>
    
                    {/* Age */}
                    <td className="py-3 px-4">
                      {app.userData?.dob?? "--"}
                    </td>
    
                    {/* Payment */}
                    <td className="py-3 px-4">
                      {app.payment ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                          Paid
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                          Pending
                        </span>
                      )}
                    </td>
    
                    {/* Booking Status */}
                    <td className="py-3 px-4">
                      {app.cancelled ? (
                        <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
                          Cancelled
                        </span>
                      ) : app.isCompleted ? (
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          Upcoming
                        </span>
                      )}
                    </td>
    
                    {/* Date & Time */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{app.slotDate}</span>
                        <span className="text-xs text-gray-500">{app.slotTime}</span>
                      </div>
                    </td>
    
                    {/* Fees */}
                    <td className="py-3 px-4 font-semibold">₹{app.amount}</td>
    
                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button className="px-4 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition">
                          View
                        </button>
    
                        {!app.cancelled && !app.isCompleted && (
                          <button className="px-4 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition">
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
    
                {/* No Appointments */}
                {appointments?.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-6 text-center text-gray-500">
                      No Appointments Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default DoctorAppointment
