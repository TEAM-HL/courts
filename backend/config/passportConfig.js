const User = require("../models/user")
const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy

// define local strategy 
module.exports = function(passport) {

    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({username: username}, (error, user) => {
                if (error) return done(error)
                if (!user) return done(null, false)
                bcrypt.compare(password, user.password, (error, result) => {
                    if (result === true) {
                        //return null as error and the user if password comparison is successful
                        return done(null, user)
                    } else {
                        // return no user if comparison fails
                        return done(null, false)
                    }
                })
            })
        })
    )
    // stores a cookie with user id inside
    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })
    // return user from the cookie
    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            cb(err, user)
        })
    })
}