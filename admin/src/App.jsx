import React from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useContext} from 'react'
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import {Route,Routes} from 'react-router-dom'
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';


function App() {

  const {atoken} = useContext(AdminContext)
  const {dtoken} = useContext(DoctorContext)

  return atoken || dtoken ?  (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer/>
      <Navbar/> 
      <div className='flex items-start'>
        <Sidebar/> 
        <div className="flex-1 ml-60 pt-16">
          <Routes> 
            {/* admin routes */}
            <Route path='/' element={<></>}/>
            <Route path='/admin-dashboard' element={<Dashboard/>}/>
            <Route path='/all-appointments' element={<AllAppointments/>}/>
            <Route path='/add-doctor' element={<AddDoctor/>}/>
            <Route path='/doctor-list' element={<DoctorList/>}/>

            {/* doctor routes */}
            <Route path='/doctorDashboard' element={<DoctorDashboard/>}/>
            <Route path='/doctorAppointment' element={<DoctorAppointment/>}/>
            <Route path='doctorProfile' element={<DoctorProfile/>} />

          </Routes>
        </div>
      </div>
      
    </div>
    
  ):
  (
    <>
     <Login/>
     <ToastContainer/>
    </>
  )
}

export default App
