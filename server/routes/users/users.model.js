const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    phone_number: String,
    address: String,
    country: String,
    postal_code: String,
    city: String,
    state: String,
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;