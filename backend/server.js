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
const startServer = async () => {
    try {
        await connectMongoDb(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Mongodb is connected successfully")

        app.listen(PORT, () => {
            console.log(`Server is running successfully on port ${PORT}`)
        })
    } catch (error) {
        console.log("Error in connecting with mongodb", error)
        process.exit(1)
    }
}

startServer()

// Middleware configure 
app.use(express.json())
app.use('/public', express.static('public'))

// CORS configuration
// Allow configured env origins plus localhost defaults for development
const allowedOrigins = [
  process.env.frontend_Url,
  process.env.admin_Url,
  'http://localhost:5173', // main frontend (Vite default)
  'http://localhost:5174'  // admin frontend (if used)
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

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






