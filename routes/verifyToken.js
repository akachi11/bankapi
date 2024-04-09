const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.json("Invalid Token")
                return
            }
            req.user = user;
            next()
        })
    } else {
        return res.json("Unauthenticated")
    }
}

module.exports = verifyToken