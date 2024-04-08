const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const cors = require("cors");

dotenv.config()

app.use(cors({
    origin: 'https://bankapi-1.onrender.com/api/auth/register'
}));

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');




mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection successful"))
    .catch((err) => {
        console.log(err)
    })

app.use(express.json());
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

app.listen(() => {
    console.log("Backend is running")
})