const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        default: ''
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User