const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Atlas connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Routes
const bookingsRouter = require('./routes/bookings')
const usersRouter = require('./routes/users')

app.use('/bookings', bookingsRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})