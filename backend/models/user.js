const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

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
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    userType: {
        type: String,
        default: 'player',
        required: true,
        trim: true,
        lowercase: true
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    }
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema)

module.exports = User