import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'   // Don't forget this!

function Test() {
  const havennotification = () => {
    toast('Hey Aviral')
  }

  return (
    <div>
      <button onClick={havennotification}>click it</button>
      <ToastContainer />
    </div>
  )
}

export default Test