const router = require('express').Router()
let Booking = require('../models/booking')

// retrieve all bookings
router.route('/').get((req, res) => {
    Booking.find()
        .then(bookings => res.json(bookings))
        .catch(e => res.status(400).json('Error: ' + e))
})

// validate booking
router.route('/validate').post((req, res) => {
    Booking.find({ 
        date: req.body.date, 
        // include more data if needed?
    }, async (err, doc) => {
        if (err) {
            return res.send({
                success: false,
                message: `Error: ${error}`
            })
        } else if (doc.length > 0) {
            console.log(doc)
            return res.send({
                success: false,
                message: "date/time already exists"
            })
        } else {
            return res.send({
                success: true,
                message: "date/time is available"
            })
        }
    })
})

// check current court availability 
router.route('/avail').post((req, res) => {
    Booking.find({ 
        date: req.body.date, 
    }, async (err, doc) => {
        if (err) {
            return res.send({
                success: false,
                message: `Error: ${error}`
            })
        } else if (doc) {
            console.log(doc)
        } else if (doc.length > 0) {
            console.log(doc.court)
            console.log(doc.time)
            console.log(doc.duration)
            // return res.send({
            //     success: false,
            //     message: "date/time already exists"
            // })
        } 
        // else {
        //     return res.send({
        //         success: true,
        //         message: "date/time is available"
        //     })
        // }
    })
})

//create new booking
router.route('/new').post((req, res) => {
    // TESTING
    console.log("hit create new booking endpoint")
    console.log(req.body)
//--------------------------------------------------------- 
    const username = req.body.username
    const date = Date.parse(req.body.date)
    const time = req.body.time
    const duration = Number(req.body.duration)
    const court = Number(req.body.court)
    const equipment = req.body.equipment
    const cost = Number(req.body.cost)

    const newBooking = new Booking({username, date, time, duration, court, equipment, cost})

    newBooking.save((err, booking) => {
        if (err) {
            return res.send({
                success: false,
                message: `Error: ${error}`
            })
        }
        return res.send({
            success: true,
            message: 'Booking has been created.'
        })
    })
        // .then(() => res.json('Booking added'))
        // .catch(e => res.status(400).json('Error: ' + e))
})

// find booking by ID
router.route('/:id').get((req, res) => {
    Booking.findById(req.params.id)
        .then(booking => res.json(booking))
        .catch(e => res.status(400).json('Error: ' + e))
})
// delete a booking
router.route('/:id').delete((req, res) => {
    Booking.findByIdAndDelete(req.params.id)
        .then(() => res.json('Booking deleted'))
        .catch(e => res.status(400).json('Error: ' + e))
})
// update a booking
router.route('/update/:id').post((req, res) => {
    Booking.findById(req.params.id)
        .then(booking => {
            booking.username = req.body.username
            booking.date = Date.parse(req.body.date)
            booking.duration = Number(req.body.duration)
            booking.court = Number(req.body.court)
            booking.equipment = req.body.equipment
            booking.cost = Number(req.body.cost)

            booking.save()
                .then(() => res.json('Booking updated'))
                .catch(e => res.status(400).json('Error: ' + e))
        })
        .catch(e => res.status(400).json('Error: ' + e))
})

module.exports = router