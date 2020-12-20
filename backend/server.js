const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bookingsRouter = require('./routes/bookings')
const usersRouter = require('./routes/users')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middleware 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: "secretcode",
    resave: true, 
    saveUninitialized: true
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

// Mongo Atlas connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// routes 
app.use('/bookings', bookingsRouter)
app.use('/users', usersRouter)


// run server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})