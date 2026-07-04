const mongoose = require('mongoose')

async function connectMongoDb(URL) {
    mongoose.set('bufferCommands', false)
    await mongoose.connect(URL, {
        serverSelectionTimeoutMS: 5000,
    })
}

module.exports ={
    connectMongoDb,
}