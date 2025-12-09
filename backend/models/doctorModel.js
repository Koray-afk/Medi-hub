// There are only 4 steps to make a model 
// 1 import mongoose 
// 2 define a schema 
// 3 Create and export a model 

const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'doctor name is required'],
        trim:true
    },
    email:{
        type:String,
        require:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:String,  // this must be given by cloudinary
        default:''
    },
    speciality:{
        type:String,
        require:[true,'Specialization is required'],
        enum:['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'General physician','Gynecologist'],
    },
    degree:{
        type:String,
        require:true
    },
    experience:{
        type:Number,
        require:true,
        min:0
    },
    about:{
        type:String,
        require:true
    },
    available:{
        type:Boolean,
        require:true
    },
    fees:{
        type:Number,
        require:true
    },
    address:{
        type:Object,
        require:true
    },
    date:{
        type:Number,
        default:Date.now()
    },
    slots_booked:{
        type:Object,
        default:{}
    }
},{minimize:false})

const Doctor= mongoose.model('Doctor',doctorSchema);

module.exports=Doctor;


