import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {

  const{userData,setUserData,loadUserProfileData,token,backend_url}=useContext(AppContext)
  console.log(userData)

  console.log("userData--->",userData)

  const [isEdit, setIsEdit] = useState(false);
  const[image,setImage]=useState(false);

  const upateUserProfileData = async()=>{
      try {
        const formData = new FormData()
  
        formData.append("name",userData.name)
        formData.append("phone",userData.phone)
        formData.append("address",JSON.stringify(userData.address))
        formData.append('email',userData.email)
        formData.append("gender",userData.gender)
        formData.append("dob",userData.dob)
  
        image && formData.append("image", userData.image)
  
        const {data} = await axios.post(`${backend_url}/api/user/updateProfile`,formData,{headers:{token}})
  
        if(data.success){
          toast.success(data.message)
          loadUserProfileData()
          setIsEdit(false)
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
      
  }

  return userData && (
    <div className="max-w-lg ml-3 mt-10 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-5 text-gray-700">
      {/* Profile Image + Name */}
      <div className="flex items-center gap-5">
       {
        isEdit ?  <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-40" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? '':assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
        </label> : 
        <img
        className="w-28 h-28 object-cover rounded-md border-4 border-purple-50 shadow"
        src={userData.image}
        alt="Profile"
      />
       }
      
        <div className="flex flex-col">
          {isEdit ? (
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:border-purple-500"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </h2>
          )}
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold text-purple-500 mb-2">
          CONTACT INFORMATION
        </h3>
        <div className="space-y-2">
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">{userData.email}</p>
          </div>

          <div>
            <p className="font-medium">Contact:</p>
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:border-blue-500"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="text-gray-600">{userData.phone}</p>
            )}
          </div>

          <div>
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                  value={userData.address.line1}
                  className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:border-blue-500"
                />
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                  value={userData.address.line2}
                  className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              <p className="text-gray-600">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-semibold text-purple-500 mb-2">
          BASIC INFORMATION
        </h3>
        <div className="space-y-2">
          <div>
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}
          </div>

          <div>
            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="text-center mt-4">
        {isEdit ? (
          <button
            onClick={upateUserProfileData}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all duration-200 shadow"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfile;