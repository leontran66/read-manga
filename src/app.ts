import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [ "'self'" ],
      baseUri: [ "'self'" ],
      blockAllMixedContent: [],
      fontSrc: [ "'self'", 'https:', 'data:' ],
      frameAncestors: [ "'self'" ],
      imgSrc: [ 'https:', 'data:' ],
      objectSrc: [ "'none'" ],
      scriptSrc: [ "'self'" ],
      scriptSrcAttr: [ "'none'" ],
      styleSrc: [ "'self'", 'https:', "'unsafe-inline'" ],
      upgradeInsecureRequests: []
    }
  }
}));

app.get('/api/auth', auth, authController.getUser);
app.post('/api/auth', authController.loginUser);
app.get('/api/genres', genreController.getAllGenres);
app.post('/api/genres', auth, genreController.createGenre);
app.patch('/api/genres/:id', cors(), auth, genreController.updateGenre);
app.delete('/api/genres/:id', cors(), auth, genreController.deleteGenre);
app.get('/api/manga', mangaController.getAllManga);
app.post('/api/manga', auth, mangaController.createManga);
app.patch('/api/manga/:id',cors(),  auth, mangaController.updateManga);
app.delete('/api/manga/:id', cors(), auth, mangaController.deleteManga);
app.get('/api/readings', auth, readingController.getReadings);
app.post('/api/readings', auth, readingController.createReading);
app.patch('/api/readings/:id', cors(), auth, readingController.updateReading);
app.delete('/api/readings/:id', cors(), auth, readingController.deleteReading);
app.post('/api/users', userController.registerUser);
app.patch('/api/users', cors(), auth, userController.updateUser);
app.delete('/api/users', cors(), auth, userController.deleteUser);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
  });
}

export default app;
