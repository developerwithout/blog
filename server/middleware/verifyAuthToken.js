const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(403).send("A token is required for authentication.");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized. Invalid Token")
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