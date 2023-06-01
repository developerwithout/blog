const jwt = require('jsonwebtoken');

const generateAuthToken = ({_id, first_name, last_name, email, isAdmin}) => {
    return jwt.sign(
        {_id, first_name, last_name, email, isAdmin},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "7h"}
    );
}

module.exports = generateAuthToken;
