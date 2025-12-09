const Rozarpay = require('razorpay')

const rozorpay = new Rozarpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

module.exports= rozorpay;