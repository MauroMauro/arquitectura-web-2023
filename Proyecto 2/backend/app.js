require('dotenv').config()
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors')


console.log('connecting to ', process.env.MONGODB_URI)


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    }) 
app.use(cors())
app.use(express.json())


app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app