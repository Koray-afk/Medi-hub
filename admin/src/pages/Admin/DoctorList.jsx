import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorList() {
  const { doctor, atoken, getAllDoctor } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getAllDoctor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atoken])

  return (
    <div className="px-8 pb-8 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Doctors</h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctor.map((value, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center p-6 overflow-hidden cursor-pointer"
          >
            <img
              src={value.image}
              alt={value.name}
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h2 className="text-lg font-medium text-gray-800">{value.name}</h2>
            <p className="text-sm text-gray-500 mb-3">{value.speciality}</p>

            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                checked={value.available}
                readOnly
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <p className="text-sm text-gray-700">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorList