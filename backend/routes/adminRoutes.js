const express=require('express')
const router = express.Router()
const {upload}=require('../middleware/multer.js')
const {addDoctor,adminLogin,allDoctors, allAppointments, appointmentCancel, adminDashboard}=require('../controllers/adminController.js')
const varifyToken = require('../middleware/authAdmin.js')

router.post('/addDoctor',varifyToken,upload.single('image'),addDoctor) 
router.post('/login',adminLogin)
router.post('/allDoctor',varifyToken,allDoctors)
router.get('/allAppointment',varifyToken,allAppointments)
router.post('/appointmentCancel',varifyToken,appointmentCancel)
router.get('/adminDashboard',varifyToken,adminDashboard)


module.exports=router