const router = require('express').Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const jwt = require('jsonwebtoken')

let User = require('../models/user')

// admin route
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: ' + e))
})

// ------LOGIN USER -------------------------------
router.route('/login').post((req, res, next) => {
console.log("hit login route")
// assign user credentials to variable
    const {username} = req.body
    const {password} = req.body

// validate inputs
    if (!username) {
        return res.send({
            success: false,
            message: 'Error! Username cannot be blank'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error! password cannot be blank'
        })
    }
    
// authenticate password
    passport.authenticate("local", (error, user) => {
        if (error) {
            res.status(500).send("Hmm. There may be a problem with the server. Please try again in a few minutes.")
        }
        if (!user || (!user && !user.password)) {
            res.status(401).send("Oops! Authentication failed. Please check your username and password.")
        } else {
            // attempt to log user in
            req.login(user, error => {
                // console.log("user", user)
                // send error is error exists 
                if (error) {
                    res.send({
                        success: false,
                        message: `Error: ${error}`
                    })
                }

                // console.log("session object: ", req.session)

                res.send({
                    success: true,
                    message: 'user successfully authenticated',
                    userType: user.userType
                })
            })
        }
    })(req, res, next)
})

// -------REGISTER USER --------------------------- 
router.route('/register').post((req, res, next) => {
    //testing
    // console.log("hit register route")
    // console.log('username = ' + req.body.username)
    
    // assign user credentials to variables 
    const {username} = req.body
    const {email} = req.body
    const userType = "player"
    const {password} = req.body 

    //validate username
    if (!username || username.length < 5) {
        return res.send({
            success: false,
            message: 'Username must have at least 5 characters.'
        })
    }
    //validate email address via regex test
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(email) === false) { // include regex for email check
        return res.send({
            success: false,
            message: 'Email must be a valid email address.'
        })
    }
    // validate password via regex test
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm.test(password) === false) {
        return res.send({
            success: false,
            message: 'Password must be at least 6 characters and include a combination of uppercase & lowercase letters and at least one number.'
        })
    } 
    
    //verify that username doesn't already exist
    User.find({
        username: username
        }, async (error, existingUser) => {
            // if server error or otherwise 
            if (error) {
                return res.send({
                    success: false,
                    message: `Error: ${error}`
                })
            // if user alreayd exists, send error message.
            } else if (existingUser.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists.'
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
        newUser.save((error, user) => {
            if (error) {
                return res.send({
                    success: false,
                    message: `Error: ${error}`
                })
            }
            return res.send({
                success: true,
                message: 'User is successfully registered.'
            })
        })
        console.log("new user registered")
    })
})
// -----------LOGOUT--------------------------------------------
router.route('/logout').get((req, res) => {
    console.log("logout endpoint hit")
    req.logout()
    console.log("check that session has been cleared: ", req.session)
    res.status(200).send('Logout successful.')
    // if (req.session) req.session.destroy(err => {
    //     if (err) res.status(400).send("Unable to log out.")
    //     else res.status(200).send('Logout successful.')
    //     console.log("check that session has been cleared: ", req.session)
    // })
})

// -------------------------------------------------------
// show user profile by ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(e => res.status(400).json('Error: ' + e))
})

// delete user by ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(e => res.status(400).json('Error: ' + e))
})

// delete user by ID
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