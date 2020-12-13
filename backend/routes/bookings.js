const router = require('express').Router()
let Booking = require('../models/booking.model')

router.route('/').get((req, res) => {
    Booking.find()
        .then(bookings => res.json(bookings))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const date = req.body.date
    const court = req.body.court
    const equipment = req.body.equipment
    const cost = req.body.cost

    const newBooking = new Booking({username, date, court, equipment, cost})

    newBooking.save()
        .then(() => res.json('User added!'))
        .catch(e => res.status(400).json('Error: ' + e))
})

module.exports = router
