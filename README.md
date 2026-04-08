# Medi-hub

Medi-hub is a multi-app hospital/doctor appointment platform built with:

- Backend: Node.js, Express, MongoDB
- User frontend: React + Vite
- Admin dashboard: React + Vite

## Project structure

- backend/ — API server, database models, authentication, cloud storage, and payments
- frontend/ — patient-facing web app
- admin/ — admin and doctor dashboard

## Prerequisites

- Node.js 18+ recommended
- MongoDB database
- Cloudinary account
- Razorpay account

## Setup

Install dependencies in each app:

1. Backend
   - cd backend
   - npm install

2. Frontend
   - cd frontend
   - npm install

3. Admin
   - cd admin
   - npm install

## Environment variables

Create a .env file in each app that needs one.

### backend/.env

Use the exact variable names referenced in the code:

- MONGODB_URI
- JWT_SECRET
- ADMIN_EMAIL
- ADMIN_PASSWORD
- frontend_Url
- admin_Url
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- CURRENCY

Example:

MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
frontend_Url=http://localhost:5173
admin_Url=http://localhost:5174
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR

### frontend/.env

- VITE_BACKEND_URL
- VITE_RAZORPAY_KEY_ID

Example:

VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

### admin/.env

- VITE_BACKEND_URL

Example:

VITE_BACKEND_URL=http://localhost:4000

## Running the apps

### Backend

From the backend folder:

- npm start

The server runs on port 4000.

### Frontend

From the frontend folder:

- npm run dev

### Admin dashboard

From the admin folder:

- npm run dev

## Notes

- The backend must be started before using the frontend and admin dashboard.
- If Razorpay or MongoDB env values are missing, the backend will fail at startup.
- Make sure the frontend and admin URLs in the backend env match the ports used by Vite.

## Troubleshooting

- If the backend shows a Razorpay error, verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.
- If MongoDB connection fails, verify MONGODB_URI and that MongoDB is running.
- If CORS blocks requests, check frontend_Url and admin_Url in backend/.env.

## Summary

Start order:

1. Backend
2. Frontend
3. Admin dashboard
