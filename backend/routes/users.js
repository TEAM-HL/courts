const router = require('express').Router()
let User = require('../models/user.model')

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

module.exports = router