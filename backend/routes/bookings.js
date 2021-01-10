const router = require('express').Router()
let Booking = require('../models/booking')

// retrieve all bookings
router.route('/').get((req, res) => {
    Booking.find()
        .then(bookings => res.json(bookings))
        .catch(e => res.status(400).json('Error: ' + e))
})

// validate booking
router.route('/validate').get((req, res) => {
    Booking.find({ 
        date: req.body.date, 
        // ***add rest of booking data***
    }, async (err, result) => {
        if (err) {
            return res.send({
                success: false,
                message: `Error: ${error}`
            })
        } else if (result.length > 0) {
            console.log(result)
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

// check current times available on date 
router.route('/checkDate').post((req, res) => {
    console.log(req.body)
    Booking.find({ 
        date: req.body.date, 
    }, async (error, result) => {
        console.log(result)
        if (error) {
            return res.send({
                success: false,
                message: `Error: ${error}`
            })
        } else if (result.length < 1) { 
            return res.send({
                success: true,
                message: "No bookings exist for selected date."
            })
        } else if (result.length > 0) {
            console.log(result)
              res.send({
                success: true,
                data: result
            })
            
            // let len = result.length
            // let rslt = {}
            // for(let i = 0; i < len; i++) {
            //     let time = result[i]["time"]
            //     let end = result[i]["end"]
            //     rslt[time] = rslt[time] || {}
            //     rslt[time][end] = rslt[time][end] || 0
            //     rslt[time][end]++
            // }
            // let max = 0
            // let commonTimes = {}
            // for(let time in rslt) {
            //     for(let end in rslt[time]) {
            //         if(rslt[time][end] > max) {
            //             max = rslt[time][end]
            //             commonTimes = {time: time, end: end}
            //         }
            //     }
            // }
            // console.log(commonTimes)
            // res.send({
            //     success: true,
            //     message: "Unavailable timings found",
            //     data: commonTimes
            // })
        }
    })
})

// check current available courts
router.route('/findCourt').post((req, res) => {
    console.log(req.body)
    Booking.find({ //use this method?
        date: req.body.date
    }, async (err, result) => {
        console.log(result)
        if (err) {
            return res.send({
                success: false,
                message: `Error: ${error}`
            })
        } else if (result.length < 1) { 
            return res.send({
                success: true,
                message: "No current bookings exist for selected date/time."
            })
        } else if (result.length > 0) {
            console.log("there is a clash")
            // check for equal start times

            const filtered = result.filter(booking => {
                if (booking.time === req.body.time) {
                    console.log(booking)
                }
            })
            
            // result.filter(obj => (obj.endTime > localState.time) && (obj.time < localState.time))

            // splice the time to a number removing colon
            
            // check start time against courts > dont include those courts
            // check end time clashes courts > don't include those courts
        }
    })
})

//create new booking
router.route('/new').post((req, res) => {
    // TESTING
    console.log("hit create new booking endpoint")
    console.log(req.body)
//--------------------------------------------------------- 
    const username = req.body.username
    const date = req.body.date
    const time = req.body.time
    const end = req.body.end
    const duration = Number(req.body.duration)
    const court = Number(req.body.court)
    const equipment = req.body.equipment
    const cost = Number(req.body.cost)

    const newBooking = new Booking({username, date, time, end, duration, court, equipment, cost})

    newBooking.save((error, booking) => {
        if (error) {
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