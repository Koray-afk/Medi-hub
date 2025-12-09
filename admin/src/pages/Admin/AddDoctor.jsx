import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function AddDoctor() {

    const[docImg,setDocImg]=useState(false)
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassowrd]=useState('')
    const[fees,setFees]=useState('')
    const[experience,setExperience]=useState('1 Year')
    const[about,setAbout]=useState('')
    const[Speciality,setSpeciality]=useState('General Physician')
    const[address1,setAddress1]=useState('')
    const[address2,setAddress2]=useState('')
    const[degree,setDegree]=useState('')

    const {backendUrl,atoken}=useContext(AdminContext)

    // if(backendUrl){
    //     console.log(backendUrl)
    // }
    // else{
    //     console.log('No backend url received')
    // }
    // console.log("Hello from Abhiman 2")


    const onSubmitHandler = async(e)=>{
        e.preventDefault()

        // Now we will call our api to add the doctor to the database 
        try{
            if(!docImg){
                return toast.error('Image not seleted')
            }

            // now we have to create a form data 
            const formData = new FormData()

            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',Speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            formData.forEach((value,index)=>{ 
                console.log(`${index},${value}`)
            })

            // console.log("Hello from Abhiman")

            const {data} = await axios.post(`${backendUrl}/api/admin/addDoctor`,formData,{headers: {
                authorization: atoken, // send as 'authorization' header
              },})

            // console.log(data)

            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassowrd('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('') 
            }
            else{
                toast.error(data.message)
            }

        }
        catch(error){
            console.log(error)
        }

    }   


  return (
    <form onSubmit={onSubmitHandler} className="p-6">
      <p className="text-2xl font-semibold mb-6 text-gray-800">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-sm">
        
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-28 h-28 object-contain border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-violet-200 transition"
            />
          </label> 
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-gray-600 mt-2 text-sm text-center">
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 mb-1 font-medium">Doctor Name</p>
            <input
            onChange={(e)=>setName(e.target.value)}
            value={name}
              type="text"
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <p className="text-gray-700 mb-1 font-medium">Doctor Email</p>
            <input
             onChange={(e)=>setEmail(e.target.value)}
             value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <p className="text-gray-700 mb-1 font-medium">Doctor Password</p>
            <input
             onChange={(e)=>setPassowrd(e.target.value)}
             value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <p className="text-gray-700 mb-1 font-medium">Experience</p>
            <select
             onChange={(e)=>setExperience(e.target.value)}
             value={experience}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
              <option value="5 year">5 year</option>
            </select>
          </div>

          <div>
            <p className="text-gray-700 mb-1 font-medium">Fees</p>
            <input
             onChange={(e)=>setFees(e.target.value)}
             value={fees}
              type="number"
              placeholder="Fees"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <p className="text-gray-700 mb-1 font-medium">Speciality</p>
            <select
             onChange={(e)=>setSpeciality(e.target.value)}
             value={Speciality}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="General physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p className="text-gray-700 mb-1 font-medium">Education</p>
            <input
             onChange={(e)=>setDegree(e.target.value)}
             value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <p className="text-gray-700 mb-1 font-medium">Address</p>
            <input
             onChange={(e)=>setAddress1(e.target.value)}
             value={address1}
              type="text"
              placeholder="Address 1"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
             onChange={(e)=>setAddress2(e.target.value)}
             value={address2}
              type="text"
              placeholder="Address 2"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

 
        <div className="mt-6">
          <p className="text-gray-700 mb-1 font-medium">About Doctor</p>
          <textarea
           onChange={(e)=>setAbout(e.target.value)}
           value={about}
            placeholder="Write about doctor"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
