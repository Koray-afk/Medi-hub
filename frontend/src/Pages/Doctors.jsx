import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext.jsx'

function Doctors() {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)

  console.log(doctors)

  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [speciality, doctors])


  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">
      <p className="text-xl mb-2 font-semibold text-gray-800 mb-6">
        Browse through the doctors specialist
      </p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left column - Specialities */}
        <div className="flex flex-col gap-3 md:col-span-1">
          <p
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-medium cursor-pointer hover:bg-violet-200 hover:text-violet-900 transition shadow-sm"
            onClick={() => speciality==='General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
          >
            General physician
          </p>

          <p 
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-medium cursor-pointer hover:bg-violet-200 hover:text-violet-900 transition shadow-sm"
            onClick={() => speciality==='Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
          >
            Gynecologist
          </p>

          <p 
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-medium cursor-pointer hover:bg-violet-200 hover:text-violet-900 transition shadow-sm"
            onClick={() => speciality==='Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
          >
            Dermatologist
          </p>

          <p 
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-medium cursor-pointer hover:bg-violet-200 hover:text-violet-900 transition shadow-sm"

            onClick={() => speciality==='Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
          >
            Pediatricians
          </p>

          <p 
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-medium cursor-pointer hover:bg-violet-200 hover:text-violet-900 transition shadow-sm"
          
            onClick={() => speciality==='Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
          >
            Neurologist
          </p>

          <p 
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-medium cursor-pointer hover:bg-violet-200 hover:text-violet-900 transition shadow-sm"
            onClick={() => speciality==='Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
          >
            Gastroenterologist
          </p>
        </div>

        {/* Right column - Doctors */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((value, index) => (
            <div
              onClick={() => navigate(`/appointment/${value._id}`)}
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 border border-gray-100 cursor-pointer"
            >
              <img
                src={value.image}
                alt="doctor"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <p className="text-green-600 font-medium text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                Available
              </p>

              <p className="mt-2 font-semibold text-gray-800 text-lg">
                {value.name}
              </p>
              <p className="text-gray-500 text-sm">{value.speciality}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctors