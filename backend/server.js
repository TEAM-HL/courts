const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// Middleware 
app.use(cors())
app.use(express.json())

// Atlas connection
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

// Routes
const bookingsRouter = require('./routes/bookings')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

app.use('/bookings', bookingsRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

// run server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})