const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const equipmentSchema = new Schema({
//     canisters: {
//         type: Number
//     },
//     racquets: {
//         type: Number
//     },
//     hopper: {
//         type: Boolean
//     }
// })

const bookingSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    date: {
        type: Date,
        required: true,
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
            type: Boolean
        }
    },
    cost: {
        type: Number,
        required: true
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking