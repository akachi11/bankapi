const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        sender: { type: String, required: true },
        receiver: { type: String, required: true },
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, required: true, default: 'pending' }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Transaction', TransactionSchema)