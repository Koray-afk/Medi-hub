const express=require('express')
const Doctor=require('../models/doctorModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appointments = require('../models/appointmentModel.js')

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

// Api for doctor login 
const loginDoctor = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            if(!email){
                return res.status(401).json({success:false,message:'Please enter valid email'})
            }
            else{
                return res.status(401).json({success:false,message:'Please enter valid password'})
            }
        }

        const doctor = await Doctor.findOne({email})

        if(!doctor){
            return res.status(401).json({success:false,message:'Invalid Credentials'})
        }

        // now once we have fould the doctor so now we have to match the passowrd 
        const isMatch = await bcrypt.compare(password,doctor.password)

        if(!isMatch){
            return res.status(404).json({success:false,message:'Invalid Password'})
        }
        else{
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            return res.status(201).json({success:true,token,message:"Login Successful"})
        }

    }
    catch(error){
        console.log(error)
        return res.status(501).json({success:false,message:error.message})
    }
}

// Api to get doctor appointments for doctor 
const appointmentsDoctor = async(req,res)=>{
    try{
        const docId = req.docId

        const allAppointments = await appointments.find({docId})
        console.log(allAppointments.length)
        
        if(!allAppointments){
            return res.status(401).json({success:false,message:'Doctor not found'})
        }

        return res.status(201).json({success:true,allAppointments})
    }
    catch(error){
        console.log(error)
        return res.status(501).json({success:false,message:error.message})
    }
}

// Api to mark appointment complete 


module.exports={
    allDoctors,loginDoctor,appointmentsDoctor
}