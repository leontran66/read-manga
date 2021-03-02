if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

const connect = require('./lib/db');
connect();

const authRoutes = require('./routes/api/auth')
const genreRoutes = require('./routes/api/genres')
const mangaRoutes = require('./routes/api/manga')
const readingRoutes = require('./routes/api/readings')
const userRoutes = require('./routes/api/users')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/genres', genreRoutes)
app.use('/api/manga', mangaRoutes)
app.use('/api/readings', readingRoutes)
app.use('/api/users', userRoutes)

module.exports = app