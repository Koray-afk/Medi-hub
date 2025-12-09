const jwt = require('jsonwebtoken')

const varifyDoctorToken = async(req,res,next)=>{
    
    const {dtoken} = req.headers
    console.log(dtoken)

    if(!dtoken){
        return res.status(401).json({status:false,message:'Access Denied : No token provided'})
    }

    try{
        const decoded = jwt.verify(dtoken,process.env.JWT_SECRET)
        // console.log(decoded)
        req.docId = decoded.id
        // console.log(req.docId)
        next()

    }
    catch(error){
        console.log(error)
        return res.status(401).json({status:false,message:error.message})
    }

}

module.exports=varifyDoctorToken