const router = require("express").Router();
const User = require("../models/User")
const Cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: "0" + req.body.phone,
        accountNumber: req.body.phone,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    })

    try {
            const usedMail = await User.findOne({ email: req.body.email });
            const usedPhone = await User.findOne({ accountNumber: req.body.phone });
            if (usedMail) {
                console.log(usedMail)
                res.json("Used mail")
                return
            } else if (usedPhone) {
                res.json("Used phone")
                return
            } else {
                const savedUser = await newUser.save();
                const accessToken = jwt.sign(
                    { id: savedUser._id },
                    process.env.JWT_SEC,
                    { expiresIn: "3d" }
                )
        
                const { password, ...others } = savedUser._doc
        
                res.status(200).json({ ...others, accessToken })
            }

    } catch (error) {
        res.status(500).json(error)
    }
})


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ accountNumber: req.body.accountNumber });
        if (!user) {
            res.json("Wrong user")
            return
        }

        const hashedPassword = Cryptojs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
        const dbPassword = hashedPassword.toString(Cryptojs.enc.Utf8)

        if (dbPassword !== req.body.password) {
            res.json("Wrong password");
            return
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        )

        const { password, ...others } = user._doc

        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;