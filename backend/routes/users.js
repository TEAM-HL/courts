const router = require('express').Router()
let User = require('../models/user')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: ' + e))
})
// login user route 
router.route('/login').post((req, res) => {
})

// register user route 
router.route('/add').post((req, res) => {
    User.findOne({username: req.body.username}, (err, doc) => {
        console.log(req.body.username)

        if (err) throw err;
        if (doc) res.send("User Already exists")
        if (!doc) {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            const category = "Player"
            
            const newUser = new User({
                username, email, password, category
            })
        }
        newUser.save()
        .then(() => res.json('User created'))
        .catch(e => res.status(400).json('Error: ' + e))
    })
})

module.exports = router