const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    reciever: { type: String, required: true },
    type: { type: String, required: true },
})