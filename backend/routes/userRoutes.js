const express = require('express')
const { registerUser, loginUser, getProfile, updateProfile, bookAppointment , listAppointment, cancelAppointment, paymentRazarpay, verifyRazorpay } = require('../controllers/userController')
const varifyUserToken = require('../middleware/authUser')
const { upload } = require('../middleware/multer')
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getProfile',varifyUserToken,getProfile)
userRouter.post('/updateProfile',varifyUserToken,upload.single('image'),updateProfile)
userRouter.post('/bookAppointment',varifyUserToken,bookAppointment)
userRouter.get('/listAppointment',varifyUserToken,listAppointment)
userRouter.post('/cancelAppointment',varifyUserToken,cancelAppointment)
userRouter.post('/paymentRazorpay',varifyUserToken,paymentRazarpay)
userRouter.post('/verifyRazorpay',varifyUserToken,verifyRazorpay)

module.exports={
    userRouter
}


