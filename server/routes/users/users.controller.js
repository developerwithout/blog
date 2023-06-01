const User = require('./users.model');
const { hashPassword, isValidPassword } = require('../../utilities/hashPasswords');
const generateAuthToken = require('../../utilities/generateAuthToken');

const getCookieParams = (logout = false) => {
    const cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict"
    }

    return logout ? { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 } : cookieParams;
}

const Users = {
    register: async (req, res, next) => {
        const { first_name="", last_name="", email="", password="" } = req.body;
        if ( !( first_name && last_name && email && password ) ) {
            return res.status(400).json({ error: "All inputs are required" })
        }
    
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: "user exists" });
            }
    
            const user = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: hashPassword(password)
            });
    
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password, doNotLogout } = req.body;
            if (!(email && password)) {
              return res.status(400).send("All inputs are required");
            }
    
            const user = await User.findOne({ email });
    
            if (user && isValidPassword(password, user.password)) {
                const authToken = 
                console.log(typeof authToken)
                return res.cookie(
                    "access_token",
                    generateAuthToken(user),
                    getCookieParams(doNotLogout)
                ).json({
                    success: "user logged in",
                    user: {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        doNotLogout
                    }
                });
            } else {
                res.status(401).send({ error: 'User Not Authorized' });
            }
    
        } catch (error) {
            next(error);
        }
    },
    updateProfile: (req, res, next) => { },
    getProfileById: (req, res, next) => { },
    getAll: (req, res, next) => { },
    getById: (req, res, next) => { },
}

module.exports = Users