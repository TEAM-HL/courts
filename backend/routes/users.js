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
router.route('/login').post( async (req, res) => {
    console.log('hit login route')
    console.log('data sent=', req.body)

    User.find
    // get hashed password from DB
    // compare hashed password linked to username to req.body.password input 

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
    const userType = "player"
    const {password} = req.body 
    
    //verify that username doesn't already exist
    User.find({
        username: username
        }, async (error, existingUser) => {
            if (error) {
                return res.send({
                    success: false,
                    message: `Error (line50): ${error}`
                })
            } else if (existingUser.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists!'
                })
            }
        // create new user instance
        const newUser = new User()
        // set credentials to new user instance
        newUser.username = username
        newUser.email = email
        newUser.userType = userType
        newUser.password = await bcrypt.hash(password, 10)  //hash password
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
        console.log("finish")
    })
})

module.exports = router