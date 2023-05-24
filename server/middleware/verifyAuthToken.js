const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        next()
    } catch (error) {
        next(error)
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(401).send("Unauthorized. Admin Required")
    }
}

module.exports = { isLoggedIn, isAdmin }