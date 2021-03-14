import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { Genre } from '../src/models/Genre';
import { User } from '../src/models/User';

describe('Test the genres route', () => {
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

    const adventure = new Genre({
      name: 'adventure',
      manga: []
    });

    await adventure.save();

    const demons = new Genre({
      name: 'demons',
      manga: []
    });

    await demons.save();
  });

  afterAll(async () => {
    await Genre.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  })

  describe('Test route authorization', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'user@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    test('POST /api/genres from user should return 401 Unauthorized', async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: 'Action'
        });
        expect(res.status).toBe(401);
        expect(res.body.errors).toBe('Authorization denied');
    });

    test('PATCH /api/genres from user should return 401 Unauthorized', async () => {
      const genre = await Genre.findOne({ name: 'adventure' });
      const res = await request(app).patch('/api/genres/' + genre._id)
        .set('x-auth-token', token)
        .send({
          name: 'Action'
        });
        expect(res.status).toBe(401);
        expect(res.body.errors).toBe('Authorization denied');
    });

    test('DELETE /api/genres from user should return 401 Unauthorized', async () => {
      const genre = await Genre.findOne({ name: 'adventure' });
      const res = await request(app).delete('/api/genres/' + genre._id)
        .set('x-auth-token', token);
        expect(res.status).toBe(401);
        expect(res.body.errors).toBe('Authorization denied');
    });
  });

  describe('POST /api/genres', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'admin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    test('no input should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Name must not be empty');
    });

    test('existing genre should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: 'Adventure'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBe('Genre already exists');
    });

    test('correct input should return 200 OK', async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: 'Action'
        });
      const genre = await Genre.findOne({ name: 'action' });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Genre created');
      expect(genre).not.toBeNull();
    });
  });

  describe('PATCH /api/genres/:id', () => {
    let token: string, response: request.Response, genreID: string, userID: string;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'admin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;

      const genre = await Genre.findOne({ name: 'adventure' });

      genreID = genre._id;

      const user = await User.findOne({ email: 'user@gmail.com' });

      userID = user._id;
    });

    afterAll(async () => {
      await Genre.findOneAndUpdate({ name: 'drama' }, { name: 'adventure' }).exec();
    });

    test('no input should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/genres/' + genreID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Name must not be empty');
    });

    test('non-genre id should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/genres/' + userID)
        .set('x-auth-token', token)
        .send({
          name: 'Drama'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBe('Genre not found');
    });

    test('updating to an existing genre should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/genres/' + genreID)
        .set('x-auth-token', token)
        .send({
          name: 'Demons'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBe('Genre already exists');
    });

    test('correct input should return 200 OK', async () => {
      const res = await request(app).patch('/api/genres/' + genreID)
        .set('x-auth-token', token)
        .send({
          name: 'Drama'
        });
      const genre = await Genre.findById(genreID);
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Genre updated');
      expect(genre.name).toBe('drama');
    });
  });

  describe('DELETE api/genres/:id', () => {
    let token: string, response: request.Response, genreID: string, userID: string;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'admin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;

      const genre = await Genre.findOne({ name: 'adventure' });

      genreID = genre._id;

      const user = await User.findOne({ email: 'user@gmail.com' });

      userID = user._id;
    });

    test('non-genre id should return 400 Bad Request', async () => {
      const res = await request(app).delete('/api/genres/' + userID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors).toBe('Genre not found');
    });

    test('correct input should return 200 OK', async () => {
      const res = await request(app).delete('/api/genres/' + genreID)
        .set('x-auth-token', token);
      const genre = await Genre.findById(genreID);
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Genre deleted');
      expect(genre).toBeNull();
    });

    
  });
});
