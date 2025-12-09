// This is the middleware for varidy whether the user is admin or not 
// In order to add or delete the pertcular doctor 
// Admin authentication middleware 
// const jwt=require('jsonwebtoken')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const varifyToken = (req,res,next)=>{
    // We have to get the token first send by the headers or cookies by our frontend 
    const token = req.headers['authorization']
    // console.log(token)
    
    // const token = authHeader.split(' ')[1] // This will remove the Bearer and give <token>
    // // console.log(token)
    
    if(!token){
        return res.status(401).json({status:false,message:'Access Denied : No token provided'})
    }

    // now we have to varify the token 
    try{
        // console.log(token)

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded,"this is decoded")
        // console.log("Hello from Abhiman")

        if(decoded.email!==process.env.ADMIN_EMAIL){
            return res.status(401).json({status:false,message:'Access Denied : No token provided'})
        }

        next()
    }
    catch(error){
        console.log(error)
        return res.status(401).json({status:false,message:error.message})
    }

}

module.exports=varifyToken