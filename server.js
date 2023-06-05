const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todo')

require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes);
app.use('/todo', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on ${process.env.PORT}`)
})    