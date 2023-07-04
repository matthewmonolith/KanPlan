const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')
const flash = require('connect-flash');
const logger = require('morgan')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todo')
const { createApi } = require('unsplash-js')

require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoDbStore.create({
        mongoUrl: process.env.DB_STRING
      })
      // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
})

app.use((req, res, next) => {
  req.unsplash = unsplash
  next()
})

app.use('/', homeRoutes);
app.use('/todo', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on ${process.env.PORT}`)
})    