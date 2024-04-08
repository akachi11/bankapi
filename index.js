const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()
const cors = require('cors')

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');


app.use(cors({
    origin: '*'
}));

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection successful"))
    .catch((err) => {
        console.log(err)
    })

    app.use(express.json());
    app.use('/api/users', userRoute)
    app.use('/api/auth', authRoute)

app.listen(5000, () => {
    console.log("Backend is running")
})