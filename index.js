const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const cors = require("cors");

dotenv.config()

app.use(cors({
    origin: '*'
}));

const userRoute = require('./routes/user');
const transactionsRoute = require('./routes/transactions');
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
app.use('/api/transactions', transactionsRoute)

app.listen(5000, () => {
    console.log("Backend is running")
})