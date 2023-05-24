const User = require('../models/UserModel');
const { hashPassword, isValidPassword } = require('../utilities/hashpasswords');
const generateAuthToken = require('../../utilities/generateAuthToken');

const Users = {
    register: (req, res, next) => { },
    login: (req, res, next) => { },
    updateProfile: (req, res, next) => { },
    getProfileById: (req, res, next) => { },
    getAll: (req, res, next) => { },
    getById: (req, res, next) => { },
}

module.exports = Users