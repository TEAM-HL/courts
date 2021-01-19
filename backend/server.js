const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
let User = require('./models/user')


require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

let whitelist = ['https://sad-bell-f8c96a.netlify.app']

// middleware 
app.use(cors({
    credentials: true,
    origin: function(origin, callback){
      // allow requests with no origin 
      if(!origin) return callback(null, true);
      if(whitelist.indexOf(origin) === -1){
        var message = `The CORS policy for this origin doesn't ` +
                  'allow access from the particular origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  }));

// Mongo Atlas connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.enable('trust proxy')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    proxy: true,
    cookie: { 
        maxAge: 600000,
        secure: true,
        // httpOnly: true, 
        // sameSite: 'none',
    },
    store: new MongoStore(
        { mongooseConnection: connection }
    )
}))
// ----CHECK AUTHENTICATION SESSION -----
app.get('/', (req, res) => {
    console.log("check-auth session: ", req.session)
    if (req.session.passport) {
        User.findById(req.session.passport.user, (err, user) => {
            // if error send error back 
            if (err) res.status(401).send(`Error: ${err}`)
            // eles send user back if found
            else res.status(200).send(user)
        })
    }
})

app.use(cookieParser(process.env.COOKIE_KEY))
require('./config/passportConfig')(passport)
app.use(passport.initialize())
app.use(passport.session())

// Routes
const router = express.Router()

const bookingsRouter = require('./routes/bookings')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const checkoutRouter = require('./routes/checkout')

app.use('/bookings', bookingsRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/checkout', checkoutRouter)

//error handling
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

//handle 404 response
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

// run server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
