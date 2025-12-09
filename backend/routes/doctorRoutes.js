const express = require('express')
const { allDoctors, loginDoctor, appointmentsDoctor } = require('../controllers/doctorController')
const varifyDoctorToken = require('../middleware/authDoctor')
const DoctorRouter = express.Router()

DoctorRouter.get('/allDoctor',allDoctors)
DoctorRouter.post('/loginDoctor',loginDoctor)
DoctorRouter.get('/appointmentsDoctor',varifyDoctorToken,appointmentsDoctor)

module.exports={
    DoctorRouter
}
