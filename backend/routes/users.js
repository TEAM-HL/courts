const router = require('express').Router()
let User = require('../models/user')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const category = "Player"

    const newUser = new User({username, email, password, category})

    newUser.save()
        .then(() => res.json('User added'))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/update/:id').post((req, res) => {
    Booking.findById(req.params.id)
        .then(booking => {
            user.username = req.body.username
            user.email = req.body.email
            user.password = req.body.password
            user.category = req.body.category

            booking.save()
                .then(() => res.json('User updated'))
                .catch(e => res.status(400).json('Error: ' + e))
        })
        .catch(e => res.status(400).json('Error: ' + e))
})

module.exports = router