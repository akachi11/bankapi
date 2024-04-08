const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String },
        phone: { type: String, unique: true, required: true },
        accountNumber: { type: String, unique: true, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)