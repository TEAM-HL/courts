const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    end: {
        type: String,
        require: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        trim: true
    },
    court: {
        type: Number,
        required: true,
        trim: true
    },
    equipment: {
        canister: {
            type: Number
        },
        racquet: {
            type: Number
        },
        hopper: {
            type: Number
        }
    },
    cost: {
        type: Number,
        required: true
    },
    receipt: {
        number: {
            type: Number, 
            required: true
        },
        date: {
            type: String,
            required: true
        }
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking