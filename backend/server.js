const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv') 
const {cloudinary}=require('./config/cloudinary.js')
// const doctorRouter = require('./routes/doctorRoutes.js')
const adminRouter = require('./routes/adminRoutes.js')

dotenv.config()

const {DB_NAME}=require('./constants.js')
const{connectMongoDb}= require('./config/mongodb')
const { DoctorRouter } = require('./routes/doctorRoutes.js')
const { userRouter } = require('./routes/userRoutes.js')
const PORT = 4000

// app configure 
const app = express()

//cloudinary connect 
// cloudinary()

// We have to connect our mongoDb 
connectMongoDb(`${process.env.MONGODB_URI}/${DB_NAME}`)
.then(()=>console.log("Mongodb is connected successfully"))
.catch((error)=>console.log("Error in connecting with mongodb",error))

// Middleware configure 
app.use(express.json())
app.use(cors())

// API endpoints 
app.get('/',(req,res)=>{
    res.send("Server is running peacefully")
})

app.get('/doctors',(req,res)=>{
    res.send("This is where all the doctors are listed")
})



//Routes 
// app.use('/api/doctors',doctorRouter)
app.use('/api/admin',adminRouter)
app.use('/api/doctor',DoctorRouter)
app.use('/api/user',userRouter)


app.listen(PORT,()=>{
    console.log(`Server is running successfully on port ${PORT}`)
})





