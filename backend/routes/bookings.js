const router = require('express').Router()
let Booking = require('../models/booking.model')

router.route('/').get((req, res) => {
    Booking.find()
        .then(bookings => res.json(bookings))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const date = Date.parse(req.body.date)
    const duration = Number(req.body.duration)
    const court = Number(req.body.court)
    const equipment = req.body.equipment
    const cost = Number(req.body.cost)

    const newBooking = new Booking({username, date, duration, court, equipment, cost})

    newBooking.save()
        .then(() => res.json('Booking added'))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/:id').get((req, res) => {
    Booking.findById(req.params.id)
        .then(booking => res.json(booking))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/:id').delete((req, res) => {
    Booking.findByIdAndDelete(req.params.id)
        .then(() => res.json('Booking deleted'))
        .catch(e => res.status(400).json('Error: ' + e))
})

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