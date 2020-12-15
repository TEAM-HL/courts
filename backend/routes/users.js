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
    console.log(req.body.username)
    
    User.findOne({username: req.body.username}, async (err, match) => {

        if (err) throw err;
        if (match) res.send("User Already exists")
        if (!match) {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            const category = "Player"
            
            const newUser = new User({
                username, email, password, category
            })
            await newUser.save()
            res.send("User Created Successfully")
        }
        // .then(() => res.json('User created'))
        // .catch(e => res.status(400).json('Error: ' + e))
    })
})

module.exports = router