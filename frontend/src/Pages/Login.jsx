import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {

  const[state,setState]=useState('Sign up')
  const[name,setName]=useState('')
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')
  const{token,backend_Url,setToken}=useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler =async (event)=>{
    event.preventDefault()

    // Now we have to make an api call 
    try{
      // now we have to check if the state is login then login api else sign up api 
      if(state==='Sign up'){
        const {data} = await axios.post(`${backend_Url}/api/user/register`,{name , email , password})
        if(data.success){
          setToken(data.token)
          localStorage.setItem('token',data.token )
          navigate('/')
        }
        else{
          token.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(`${backend_Url}/api/user/login`,{password,email})
        if(data.success){
          setToken(data.token)
          localStorage.setItem('token',data.token )
          toast.success('Login successful!');
          navigate('/')
        }
        else{
          token.error(data.message)
        }
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form 
    className="min-h-[80vh] flex justify-center items-center px-4"
    onSubmit={onSubmitHandler}
  >
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
      
    
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-800 mb-2">
          {state === 'Sign up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-gray-500 text-sm">
          Please {state === 'Sign up' ? 'create an account' : 'login'} to book an appointment
        </p>
      </div>
  
      {state === 'Sign up' && (
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Full Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
      )}
  
      <div className="flex flex-col gap-1">
        <label className="text-gray-600 font-medium">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>
  
      <div className="flex flex-col gap-1">
        <label className="text-gray-600 font-medium">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>
  

      <button 
        type="submit"
        className="bg-purple-600 cursor-pointer text-white font-semibold py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        {state === 'Sign up' ? 'Create Account' : 'Login'}
      </button>
  
  
      <p
        className="text-center text-sm text-gray-500 cursor-pointer hover:text-purple-600 transition"
        onClick={() => setState(state === 'Sign up' ? 'Login' : 'Sign up')}
      >
        {state === 'Sign up' 
          ? 'Already have an account? Login' 
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  </form>
  )
}

export default Login
