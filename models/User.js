const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String },
        phone: { type: String, unique: true, required: true },
        accountNumber: { type: String, unique: true, required: true },
        balance: {type: Number, required: true, default: 10000},
        faucet: {type: Number, required: true, default: 99000},
        expenses: { type: Number, required: true, default: 0 },
        income: { type: Number, required: true, default: 0 },
        email: { type: String, required: true, unique: true },
        password: { type: String },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)