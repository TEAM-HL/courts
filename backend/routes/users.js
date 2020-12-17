const router = require('express').Router()
const bcrypt = require('bcryptjs')
let User = require('../models/user')

// admin route
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: ' + e))
})
// login user route 
router.route('/login').post((req, res) => {
    console.log('hit login route')
    console.log('data sent=', req.body)
    User.find({ username: req.body.username, password: req.body.password }, 
        async (err, match) => {
        try {
            console.log('match=', match)
            if (!match.length > 0) res.send("Invalid username/password")
            if (match.length > 0) res.send("user matched")   
            } catch (error) {
               res.send(error)
            }
        })
})

// register user route 
router.route('/register').post((req, res, next) => {
    //testing
    console.log("hit register route")
    console.log('username = ' + req.body.username)
    
    // assign user credentials to variables 
    const {username} = req.body
    const {email} = req.body
    const userType = "Player"
    const {password} = req.body 
    
    User.find({
        username: username
        }, (error, existingUsers) => {
            if (error) {
                return res.send({
                    success: false,
                    message: `Error: ${error}`
                })
            } else if (existingUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists!'
                })
            }
        // create new user 
        const newUser = new User()
        // set credentials of new User
        newUser.username = username
        newUser.email = email
        // hash the password 
        newUser.password = bcrypt.hash(password, 10) 
        // save new user 
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: `Error: ${error}`
                })
            }
            return res.send({
                success: true,
                message: 'User successfully registered.'
            })
        })

    })
})


module.exports = router