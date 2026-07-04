require('dotenv').config()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Doctor = require('../models/doctorModel')
const { DB_NAME } = require('../constants')

const BASE_IMAGE_URL = process.env.BACKEND_URL || 'http://localhost:4000'

const doctors = [
  { name: 'Dr. Richard James', image: 'doc1.png', speciality: 'General physician', degree: 'MBBS', experience: 4, fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Emily Larson', image: 'doc2.png', speciality: 'Gynecologist', degree: 'MBBS', experience: 3, fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Sarah Patel', image: 'doc3.png', speciality: 'Dermatologist', degree: 'MBBS', experience: 1, fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Christopher Lee', image: 'doc4.png', speciality: 'Pediatrician', degree: 'MBBS', experience: 2, fees: 40, address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Jennifer Garcia', image: 'doc5.png', speciality: 'Neurologist', degree: 'MBBS', experience: 4, fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Andrew Williams', image: 'doc6.png', speciality: 'Neurologist', degree: 'MBBS', experience: 4, fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Christopher Davis', image: 'doc7.png', speciality: 'General physician', degree: 'MBBS', experience: 4, fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Timothy White', image: 'doc8.png', speciality: 'Gynecologist', degree: 'MBBS', experience: 3, fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Ava Mitchell', image: 'doc9.png', speciality: 'Dermatologist', degree: 'MBBS', experience: 1, fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Jeffrey King', image: 'doc10.png', speciality: 'Pediatrician', degree: 'MBBS', experience: 2, fees: 40, address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Zoe Kelly', image: 'doc11.png', speciality: 'Neurologist', degree: 'MBBS', experience: 4, fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Patrick Harris', image: 'doc12.png', speciality: 'Neurologist', degree: 'MBBS', experience: 4, fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Chloe Evans', image: 'doc13.png', speciality: 'General physician', degree: 'MBBS', experience: 4, fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Ryan Martinez', image: 'doc14.png', speciality: 'Gynecologist', degree: 'MBBS', experience: 3, fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Amelia Hill', image: 'doc15.png', speciality: 'Dermatologist', degree: 'MBBS', experience: 1, fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
]

const about = 'Committed to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.'

async function seedDoctors() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
  const connectionUrl = `${mongoUri}/${DB_NAME}`

  await mongoose.connect(connectionUrl)
  console.log('Connected to MongoDB')

  const existingCount = await Doctor.countDocuments()
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} doctors. Skipping seed.`)
    await mongoose.disconnect()
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash('doctor1234', salt)

  const doctorDocs = doctors.map((doc, index) => ({
    ...doc,
    email: `doctor${index + 1}@medihub.com`,
    password: hashedPassword,
    image: `${BASE_IMAGE_URL}/public/doctors/${doc.image}`,
    about,
    available: true,
  }))

  await Doctor.insertMany(doctorDocs)
  console.log(`Seeded ${doctorDocs.length} doctors successfully`)
  await mongoose.disconnect()
}

seedDoctors().catch((error) => {
  console.error('Seed failed:', error.message)
  process.exit(1)
})
