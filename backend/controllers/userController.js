const express = require('express')
const validator = require('validator')
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { v2: cloudinary } = require('cloudinary');
const Doctor = require('../models/doctorModel');
const appointments =require('../models/appointmentModel');
const razorpay = require('../config/rozarpay.js')


// Api to create a new user 
const registerUser = async(req,res)=>{
   try {
     const{name,email,password}=req.body;
 
 
     if(!name || !email || !password){
         return res.status(400).json({success:false,nessage:'Some fields are missing'})
     }
 
     // Now we have to verify email and password 
     if(!validator.isEmail(email)){
         return res.status(400).json({success:false,nessage:'Please enter a valid email '})
     }
 
     if(password.length<8){
         return res.status(400).json({success:false,nessage:'Please enter a strong password'})
     }
 
     // Now we have to hash our password to protect it 
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)

      // Now ew have to save the data to the database 
     // so we have to create one object 

     const UserData = {
        name,
        email,
        password:hashedPassword
     }

     const newUser = new User(UserData)
     const user =await newUser.save()

     // Ab jaise he user save ho jaega to hame ek _id name ke key milege db se so hm log ek token generate kar dnege 
     const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

     return res.status(201).json({success:true,token})


     // Now we have to send the response 

   } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
   }

}

// Api for user login 
const loginUser = async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(401).json({success:false,message:'Please enter credentials'})
        }

        // console.log(email)
        // Now we have to find the user in the database 
        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(404).json({success:false,message:'User does not exist'})
        }

        // Now we have to compare the password which we get from form data 
        const isMatch = await bcrypt.compare(password,userExist.password)

        if(isMatch){
            const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        }
        else{
            return res.json({success:false,message:'Invalid Credentials'})
        }



    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:false,message:error.message})
    }
}

// Api to get user profile data 
const getProfile = async(req,res)=>{
    try{
        const userId = req.userId
        console.log(userId)
        console.log('Hello from Abhiman')
        const userData = await User.findById(userId).select('-password')

        res.json({success:true,userData})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// AP to update the user profile 
const updateProfile = async(req,res)=>{
    try{
        // we will get the userId from header or token
        const userId = req.userId
        const{name ,phone , email , address ,dob, gender} = req.body 
        const imageFile = req.file 

        console.log(name , phone)

        if(!name || !email || !dob || !gender || !phone){
            return res.status(404).json({success:false,message:'Missing fields'})
        }

        await User.findByIdAndUpdate(userId , {name , email , phone , dob , gender , address:JSON.parse(address)})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url 

            await User.findByIdAndUpdate(userId,{image:imageUrl})
        }

    

        return res.status(200).json({success:true , message:'Profile added successfully'})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api to book appointment 
const bookAppointment = async(req,res)=>{
    try{
        const userId = req.userId
        const {docId , slotDate , slotTime} = req.body

        // Now we have to first find the doctor data using doctor id 
        const docData = await Doctor.findById(docId).select('-password')


        const slots_booked = docData.slots_booked

        // now we will check whether the perticular date or at perticular time doctor exist or not 
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.status(404).json({success:false,message:'Slots not available'})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime )
        }


        //Now we have to find the user using userId 
        const userData = await User.findById(userId).select('-password')

        // we have done this because user to hamen bas uska bookings dikhana hai na ki sab ka 
        delete docData.slots_booked

        const appointmentData = {
            userId,docId,userData,docData,amount:docData.fees,slotTime,slotDate,date:Date.now()
        }

        const newAppointment = new appointments(appointmentData)
        newAppointment.save()

        // now we have save the slots data in doctor data 
        await Doctor.findByIdAndUpdate(docId,{slots_booked})

        return res.status(201).json({success:true,message:"Appointment booked"})

    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

// Api to get user appointment 
const listAppointment = async(req,res)=>{
    try{
        const userId = req.userId
        // Now we have to find the appointment for the perticular user 
        const appointment = await appointments.find({userId})

        return res.status(201).json({success:true,appointment})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:true,message:error.message})
    }
}

// Api to cancel appointment 
const cancelAppointment = async(req,res)=>{
    try{
        const userId = req.userId
        const {appointmentId} = req.body
    
        // Now we will get the appointment data of that perticular user
        const appointmentData = await appointments.findById(appointmentId)

        if(appointmentData.userId!==userId){
            return res.status(404).json({success:false,message:'Unauthorize action'})
        }

        await appointments.findByIdAndUpdate(appointmentId,{cancelled:true})

        // Now we have to re release that slot off that perticular doctor 
        const {docId , slotDate , slotTime}= appointmentData

        const doctorData = await Doctor.findById(docId)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate]=slots_booked[slotDate].filter((e)=>e!==slotTime)

        await Doctor.findByIdAndUpdate(docId,{slots_booked})

        return res.status(201).json({success:true,message:"Appointment Cancelled"})

    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

// Api to make payment of appointment using razorpay 
const paymentRazarpay = async(req,res)=>{
    //there are three steps to to make a instance of razorpay 
    // Create Options 
    // Create order 
    try{
        const {appointmentId} = req.body
        const appointmentData = await appointments.findById(appointmentId)
        
        if(!appointmentData || appointmentData.cancelled){
            return res.status(400).json({success:false,message:"Unauthorize action or appointment not found"})
        }

        const options = {
            amount:appointmentData.amount * 100,
            currency:process.env.CURRENCY,
            receipt:appointmentId
        }

        const order = await razorpay.orders.create(options)

        return res.status(201).json({success:true,order})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:true, message:'Something went wring in payment gateway'})
    }
}

// Api to verify payment of razorpay 
const verifyRazorpay = async(req,res)=>{
    try{
        const {razorpay_order_id}= req.body
        const orderInfo = await razorpay.orders.fetch(razorpay_order_id)

        console.log(orderInfo)

        if(orderInfo.status==='paid'){
            await appointments.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            return res.status(201).json({success:true,message:"Payment SuccessFul"})
        }
        else{
            return res.status(401).json({success:fal,message:"Payment SuccessFul"})
        }
        }
    catch(error){
        console.log(error)
        return res.status(501).json({success:fal,message:"Something went wrong in the payment process"})
    }
}

module.exports={
    registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazarpay,verifyRazorpay
}