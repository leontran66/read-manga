if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

const app = express();

const db = process.env.MONGODB_URI_LOCAL;
mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).catch(err => {
  console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
  process.exit();
});

const authRoutes = require('./routes/api/auth');
const genreRoutes = require('./routes/api/genres');
const mangaRoutes = require('./routes/api/manga');
const readingRoutes = require('./routes/api/readings');
const userRoutes = require('./routes/api/users');

app.set('port', process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/manga', mangaRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/users', userRoutes);

export default app;