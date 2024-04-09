const verifyToken = require("./verifyToken");
const Transaction = require("../models/Transaction")
const router = require("express").Router();

// CREATE NEW TRANSACTION
router.post("/send", verifyToken, async (req, res) => {
    const newTransaction = new Transaction({
        sender: req.body.sender,
        receiver: req.body.receiver,
        type: req.body.type,
        amount: req.body.amount
    })

    try {
        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction)
    } catch (error) {
        res.json(error)
    }
})

// GET TRANSACTION BY ID
router.get("/get-transaction-ID/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id })
        if (transaction) {
            res.json(transaction)
            return
        } else {
            res.json("Invalid ID")
        }
    } catch (error) {
        res.json(error)
    }
})

// GET TRANSACTION BY ACCOUNT
router.get("/get-transaction-AC/:account", async (req, res) => {
    try {
        const transactions = await Transaction.find({ "$or": [{ sender: req.params.account }, { receiver: req.params.account }] }).sort({ createdAt: -1 })
        res.json(transactions)
    } catch (error) {
        res.json(error)
    }
})


// UPDATE TRANSACTION
router.put("/:id", async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedTransaction)
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;


