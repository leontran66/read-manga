import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { Manga } from '../src/models/Manga';
import { Reading } from '../src/models/Reading';
import { User } from '../src/models/User';

describe('Test the readings route', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'user@gmail.com',
      password: await bcrypt.hash('testing', 12),
      accessLevel: 'user'
    });

    await user.save();

    const admin = new User({
      email: 'admin@gmail.com',
      password: await bcrypt.hash('testing', 12),
      accessLevel: 'admin'
    });

    await admin.save();

    const onepiece = new Manga({
      title: 'one piece',
      author: 'eiichiro oda',
      synopsis: 'Gol D. Roger, a man referred to as the "Pirate King," is set to ...',
      chapters: 1007
    });

    await onepiece.save();

    const berserk = new Manga({
      title: 'berserk',
      author: 'kentarou miura',
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
      chapters: 357
    });

    await berserk.save();

    const reading = new Reading({
      user: user._id,
      manga: berserk._id,
      chapter: 300
    });

    await reading.save();
  });

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('Test route authorization', () => {
    let token: string, response: request.Response, mangaID: string, readingID: string;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
        .send({
          email: 'admin@gmail.com',
          password: 'testing'
        });

      token = response.body.token;

      const manga = await Manga.findOne({ title: 'one piece' });

      mangaID = manga._id;

      const reading = await Reading.findOne({ chapter: 300 });

      readingID = reading._id;
    });

    test('POST /api/readings while logged out should return 401 Unauthorized', async () => {
      const res = await request(app).post('/api/readings')
        .send({
          user: mangaID,
          manga: mangaID,
          chapter: 1000
        });
        expect(res.status).toBe(401);
        expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('PATCH /api/readings while logged out should return 401 Unauthorized', async () => {
      const res = await request(app).patch('/api/readings/' + readingID)
        .send({
          title: 'One Piece',
          chapter: 1000
        });
        expect(res.status).toBe(401);
        expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('PATCH /api/readings/:id not belonging to user should return 401 Unauthorized', async () => {
      const res = await request(app).patch('/api/readings/' + readingID)
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 355
        });
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('DELETE /api/readings while logged out should return 401 Unauthorized', async () => {
      const res = await request(app).delete('/api/readings/' + readingID);
        expect(res.status).toBe(401);
        expect(res.body.errors[0].msg).toBe('Authorization denied');
    });
  
    test('DELETE /api/readings/:id not belonging to user should return 401 Unauthorized', async () => {
      const res = await request(app).delete('/api/readings/' + readingID)
        .set('x-auth-token', token);
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Authorization denied');
    });
  });

  describe('GET /api/readings', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'user@gmail.com',
        password: 'testing'
      });

      token = response.body.token;

      await Reading.deleteMany({}).exec();
    });

    test('no readings should return 400 Bad Request', async () => {
      const res = await request(app).get('/api/readings')
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Couldn\'t find any readings')
    });
    
    test('correct input should return 200 OK', async () => {
      const user = await User.findOne({ email: 'user@gmail.com' });
      const manga = await Manga.findOne({ title: 'berserk' });
      const reading = new Reading({
        user: user._id,
        manga: manga._id,
        chapter: 300
      });
  
      await reading.save();

      const res = await request(app).get('/api/readings')
        .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body.readings[0].user).toBe(user._id.toString());
      expect(res.body.readings[0].manga).toBe(manga._id.toString());
      expect(res.body.readings[0].chapter).toBe(300);
    });
  });

  describe('POST /api/readings', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'user@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    test('no input should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Title must not be empty.');
      expect(res.body.errors[0].param).toBe('title');
      expect(res.body.errors[1].msg).toBe('Chapter must be a number.');
      expect(res.body.errors[1].param).toBe('chapter');
    });
    
    test('non-existent manga should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'Fullmetal Alchemist',
          chapter: 100
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Manga not found');
    });
    
    test('existing reading should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 350
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Reading for this title already exists.');
      expect(res.body.errors[0].param).toBe('title');
    });

    test('greater than manga chapters input should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'One Piece',
          chapter: 2000
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Chapter cannot be more than number of chapters in manga.');
      expect(res.body.errors[0].param).toBe('chapter');
    });
    
    test('correct input should return 200 OK', async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'One Piece',
          chapter: 1000
        });
      const manga = await Manga.findOne({ title: 'one piece' });
      const reading = await Reading.findOne({ manga: manga._id });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Added One piece to reading list.');
      expect(reading).not.toBeNull();
    });
  });

  describe('PATCH /api/readings/:id', () => {
    let token: string, response: request.Response, mangaID: string, readingID: string;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'user@gmail.com',
        password: 'testing'
      });

      token = response.body.token;

      const manga = await Manga.findOne({ title: 'berserk' });

      mangaID = manga._id;
      
      const reading = await Reading.findOne({ manga: manga._id });

      readingID = reading._id;
    });

    test('no input should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/readings/' + readingID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Title must not be empty.');
      expect(res.body.errors[0].param).toBe('title');
      expect(res.body.errors[1].msg).toBe('Chapter must be a number.');
      expect(res.body.errors[1].param).toBe('chapter');
    });
    
    test('non-reading id should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/readings/' + mangaID)
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 355
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Reading not found');
    });
    
    test('greater than manga chapters input should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/readings/' + readingID)
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 400
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Chapter cannot be more than number of chapters in manga.');
      expect(res.body.errors[0].param).toBe('chapter');
    });
    
    test('correct input should return 200 OK', async () => {
      const res = await request(app).patch('/api/readings/' + readingID)
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 355
        });
      const reading = await Reading.findOne({ _id: readingID });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Reading updated.');
      expect(reading.chapter).toBe(355);
    });
  });

  describe('DELETE /api/readings/:id', () => {
    let token: string, response: request.Response, mangaID: string, readingID: string;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'user@gmail.com',
        password: 'testing'
      });

      token = response.body.token;

      const manga = await Manga.findOne({ title: 'berserk' });

      mangaID = manga._id;
      
      const reading = await Reading.findOne({ manga: manga._id });

      readingID = reading._id;
    });

    test('non-reading id should return 400 Bad Request', async () => {
      const res = await request(app).delete('/api/readings/' + mangaID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Reading not found');
    });
    
    test('correct input should return 200 OK', async () => {
      const res = await request(app).delete('/api/readings/' + readingID)
        .set('x-auth-token', token);
      const reading = await Reading.findOne({ _id: readingID });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Reading deleted.');
      expect(reading).toBeNull();
    });
  });
});
