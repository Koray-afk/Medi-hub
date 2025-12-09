import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyAppointment from "./Pages/MyAppointment";
import Appointment from "./Pages/Appointment";
import Test from "./Pages/Test";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MyProfile from "./Pages/MyProfile";
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/MyAppointment" element={<MyAppointment/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>
        <Route path="/aviral" element={<Test/>}/>
        <Route path="MyProfile" element={<MyProfile/>}/>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;