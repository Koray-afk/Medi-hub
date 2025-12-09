//Api for adding doctors 
const express = require('express')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { v2: cloudinary } = require('cloudinary');
const Doctor = require('../models/doctorModel')
const jwt = require('jsonwebtoken');
const appointments = require('../models/appointmentModel');
const User = require('../models/userModel');

const addDoctor = async(req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body 
        const imageFile = req.file

        console.log(imageFile)

        // now we have to check whether each data is present or not 
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.status(400).json({success:false,nessage:'Some fields are missing'})
        }

        // Now we have all the data coming from the frontend 

        // Now validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,nessage:'Please enter a valid email '})
        }
        // Now validate password 
        if(password.length<8){
            return res.status(400).json({success:false,nessage:'Please enter a strong password'})
        }

        // Now we have to encrypt this password and have to save in our database 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // Now we have to upload this file image to cloudinary and in return we get a url 
        // upload image to cloudinary 

        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageUrl =imageUpload.secure_url

        // console.log(imageUrl)

        // console.log("exx", parseInt(experience))
        // Now we have to save all this data to out database 
        const doctorData ={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience: parseInt(experience),
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new Doctor(doctorData)   // we have taken this as a reference 
        await newDoctor.save()

        // Now our data is saved to the database 
        return res.status(200).json({success:true,message:'Doctor added',newDoctor})

    }
    catch(error){
        // console.log("--->>>>", error)
        return res.status(400).json({success:false,message:error.message})
    }
}

// Api for admin login 
const adminLogin = async (req,res) => {
    try{
        const {email,password}=req.body
        // console.log(email)

        // if email and password matches then we will generate and send the token 
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            
            const token = jwt.sign({email},process.env.JWT_SECRET,  { expiresIn: '1h' })

            // console.log(token)

            res.status(200).json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid admin credentials'})
        }
    }
    catch(error){
        return res.status(400).json({status:false,message:error.message})
    }
}

// Api to get all doctors list for admin panel 
const allDoctors = async(req,res)=>{
    try{
        const allDoctors = await Doctor.find({}).select('-password')

        res.status(200).json({success:true,allDoctors})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({success:false,message:error.message})
    }
}

// Api to get all appointment list 
const allAppointments = async(req,res)=>{
    try{
        const allAppointments = await appointments.find({})

        return res.status(201).json({success:true,allAppointments})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

const appointmentCancel = async(req,res)=>{
    try {
        const {appointmentId}=req.body
    
        const appointmentData = await appointments.findById(appointmentId)

        if(appointmentData.cancelled){
            return res.status(400).json({status:false,message:"Appointment Already Cancelled"})
        }

        await appointments.findByIdAndUpdate(appointmentId,{cancelled:true})
    
        // Now we have to reschedule slots
        const {docId , slotDate , slotTime }=appointmentData
    
        const doctorData = await Doctor.findById(docId)
        let slots_booked = doctorData.slots_booked
    
        slots_booked[slotDate]=slots_booked[slotDate].filter((value)=>value!=slotTime)
    
        await Doctor.findByIdAndUpdate(docId,{slots_booked})
    
        return res.status(201).json({success:true,message:'Appointment Cancel'})
    } catch (error) {
        console.log(error)
        return res.status(501).json({success:false,message:error.message})
    }

}

// Api to get Dashboard data 
const adminDashboard = async(req,res)=>{
    try{
        // we have to get total number of users , number od appointments and  latest 5 appointments
        // we have to get all the data 
        const allDoctors = await Doctor.find({})
        const allUsers = await User.find({})
        const allAppointments = await appointments.find({})

        const dashData = {
            doctors : allDoctors.length,
            patients:allUsers.length,
            appointment : allAppointments.length,
            latestAppointment:allAppointments.reverse().slice(0,5)
        }

        return res.status(201).json({success:true,dashData})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({success:false,nessage:error.message})
    }
}

module.exports={
    addDoctor,
    adminLogin,
    allDoctors,
    allAppointments,
    appointmentCancel,
    adminDashboard
}
