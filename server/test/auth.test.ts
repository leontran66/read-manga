import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { User } from '../src/models/User';

describe('Test the auth route', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'existinguser@gmail.com',
      password: await bcrypt.hash('testing', 12),
      accessLevel: 'user'
    });

    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
  });

  describe('GET /api/auth', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
        .send({
          email: 'existinguser@gmail.com',
          password: 'testing'
        });
      
      token = response.body.token;
    });

    test('unauthorized user should return 401 Unauthorized', async () => {
      const res = await request(app).get('/api/auth');
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('correct input should return 200 OK', async () => {
      const res = await request(app).get('/api/auth')
        .set('x-auth-token', token);
      expect(res.status).toBe(200);
      const user = await User.findOne({ email: 'existinguser@gmail.com' });
      expect(res.body.user.email).toBe(user.email);
    });
  });

  describe('POST /api/auth', () => {
    test('no input should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/auth');
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Invalid credentials');
    });
    
    test('non-existent user should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/auth')
        .send({
          email: 'nonexistinguser@gmail.com',
          password: 'testing'
        });
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Invalid credentials');
    });

    test('incorrect password should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/auth')
        .send({
          email: 'existinguser@gmail.com',
          password: 'testingg'
        });
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Invalid credentials');
    });

    test('correct input should return 200 OK', async () => {
      const res = await request(app).post('/api/auth')
        .send({
          email: 'existinguser@gmail.com',
          password: 'testing'
        });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });
  });
});
