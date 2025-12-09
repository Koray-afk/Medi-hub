const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure the temp directory exixts 
const tempDir = path.join("public", "temp");

fs.mkdirSync(tempDir, { recursive: true });

// console.log(tempDir)

// We have to add the disk storage configuration 
const storage = multer.diskStorage({
    // destination means kon se folder ke ander hame is file ko store karna hai
    destination: function(req,file,cb){
        cb(null,'./public/temp')  // here . represent current directory  
    },
    // by which u want to save the file in your system 
    filename:function(req,file,cb){
        console.log(file.originalname)
        cb(null,file.originalname)
    }
});

// We have created a instance of storage 
const upload = multer({storage})

module.exports={upload}


