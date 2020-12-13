const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    email: {
        required: true,
        unique: true,
        trim: true
    },
    password: {
        required: true,
        trim: true
    },
    category: {
        required: true,
        trim: true
    },
    dp: {
        required: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
