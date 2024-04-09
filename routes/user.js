const router = require("express").Router();
const User = require("../models/User")

router.get("/find/:acct", async (req, res) => {
    try {
        const user = await User.findOne({ accountNumber: req.params.acct })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;