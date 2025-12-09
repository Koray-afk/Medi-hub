
const jwt = require('jsonwebtoken')
require('dotenv').config();


const varifyUserToken = (req,res,next)=>{
   
    const {token} = req.headers
    console.log(token)
    console.log("token received")
    
    if(!token){
        return res.status(401).json({status:false,message:'Access Denied : No token provided'})
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.id
        console.log('request body',req.body)
        next()
        
    }
    catch(error){
        console.log(error)
        return res.status(401).json({status:false,message:error.message})
    }

}

module.exports=varifyUserToken