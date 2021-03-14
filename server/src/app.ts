if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { auth } from './util/auth';

import * as authController from './controllers/auth';
import * as genreController from './controllers/genre';
import * as mangaController from './controllers/manga';
import * as readingController from './controllers/reading';
import * as userController from './controllers/user';

const app = express();

let db = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
  db = process.env.MONGODB_URI_LOCAL;
}
mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).catch(err => {
  console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
  process.exit();
});

app.set('port', process.env.PORT || 5000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get('/api/auth', auth, authController.getUser);
app.post('/api/auth', authController.loginUser);
app.post('/api/genres', auth, genreController.createGenre);
app.patch('/api/genres/:id', auth, genreController.updateGenre);
app.delete('/api/genres/:id', auth, genreController.deleteGenre);
app.get('/api/manga', mangaController.getAllManga);
app.get('/api/manga/:id', mangaController.getManga);
app.post('/api/manga', auth, mangaController.createManga);
app.patch('/api/manga/:id', auth, mangaController.updateManga);
app.delete('/api/manga/:id', auth, mangaController.deleteManga);
app.get('/api/readings', auth, readingController.getReadings);
app.post('/api/readings', auth, readingController.createReading);
app.patch('/api/readings/:id', auth, readingController.updateReading);
app.delete('/api/readings/:id', auth, readingController.deleteReading);
app.post('/api/users', userController.registerUser);
app.patch('/api/users', auth, userController.updateUser);
app.delete('/api/users', auth, userController.deleteUser);

export default app;
