import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { User } from '../src/models/User';

describe('Test the user route', () => {
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

  describe('POST /api/users', () => {
    test('no input should return 400 Bad Request', async () => {
      const res = await request(app).post('/api/users');
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Email is not valid.');
      expect(res.body.errors[0].param).toBe('email');
      expect(res.body.errors[1].msg).toBe('Password must be at least 6 characters long.');
      expect(res.body.errors[1].param).toBe('password');
    });

    test('existing user should return 400 Bad Request', async() => {
      const res = await request(app).post('/api/users')
        .send({
          email: 'existinguser@gmail.com',
          password: 'testing',
          confirmPW: 'testing'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Email is already in use.');
    });

    test('mismatched passwords should return 400 Bad Request', async() => {
      const res = await request(app).post('/api/users')
        .send({
          email: 'newuser@gmail.com',
          password: 'testing',
          confirmPW: 'testingg'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Passwords do not match.');
    });

    test('correct input should return 200 OK', async() => {
      const res = await request(app).post('/api/users')
        .send({
          email: 'newuser@gmail.com',
          password: 'testing',
          confirmPW: 'testing'
        });
      const newuser = await User.findOne({ email: 'newuser@gmail.com' });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(newuser.email).toBe('newuser@gmail.com');
    });
  });

  describe('PATCH /api/users', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
        .send({
          email: 'existinguser@gmail.com',
          password: 'testing'
        });
      
      token = response.body.token;
    });

    afterAll(async () => {
      await User.findOneAndUpdate({ email: 'existinguser@gmail.com' }, { password: await bcrypt.hash('testing', 12) }).exec();
    });

    test('unauthorized user should return 401 Unauthorized', async () => {
      const res = await request(app).patch('/api/users')
        .send({
          currentPW: 'testing',
          password: 'testingg',
          confirmPW: 'testingg'
        });
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('no input should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Password must be at least 6 characters long.');
      expect(res.body.errors[0].param).toBe('password');
    });
    
    test('incorrect password should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'testingg',
          password: 'testinggg',
          confirmPW: 'testinggg'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Password is incorrect.');
      expect(res.body.errors[0].param).toBe('currentPW');
    });

    test('same password should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'testing',
          password: 'testing',
          confirmPW: 'testing'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('New password cannot be the same as current password.');
      expect(res.body.errors[0].param).toBe('password');
    });
    
    test('mismatched passwords should return 400 Bad Request', async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'testing',
          password: 'testingg',
          confirmPW: 'testinggg'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Passwords do not match.');
      expect(res.body.errors[0].param).toBe('confirmPW');
    });
    
    test('correct input should return 200 OK', async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'testing',
          password: 'testingg',
          confirmPW: 'testingg'
        });
        const existinguser = await User.findOne({ email: 'existinguser@gmail.com' });
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe('User updated');
        expect(await bcrypt.compare('testingg', existinguser.password)).toBe(true);
    });
  });

  describe('DELETE /api/users', () => {
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
      const res = await request(app).delete('/api/users');
      expect(res.status).toBe(401);
      expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('correct input should return 200 OK', async () => {
      const res = await request(app).delete('/api/users')
        .set('x-auth-token', token);
        const existinguser = await User.findOne({ email: 'existinguser@gmail.com' });
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe('User deleted');
        expect(existinguser).toBeNull();
    });
  });
});
