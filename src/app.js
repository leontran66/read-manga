const express = require('express')
const app = express()

const userRoutes = require('./components/user/users')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

module.exports = app;