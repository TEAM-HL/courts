const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    court: {
        type: Number,
        required: true,
        trim: true
    },
    equipment: {
        canisters: {
            type: Number,
            required: true
        },
        racquets: {
            type: Number,
            required: true
        },
        hopper: {
            type: Boolean,
            required: true
        }
    },
    cost: {
        type: Number,
        required: true
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
