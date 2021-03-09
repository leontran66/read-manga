import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { User } from '../src/models/User';

describe('POST /api/users', () => {
  afterEach(async () => {
    await User.deleteMany({}).exec();
  });

  describe('no input', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/users')
        .send({
          email: '',
          password: '',
          confirmPW: ''
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('existing user', () => {
    beforeAll(async () => {
      const user = new User({
        email: 'testuser@gmail.com',
        password: await bcrypt.hash('testing', 2),
        accessLevel: 'user',
        reading: []
      });

      await user.save();
    });

    afterAll(async () => {
      await User.deleteMany({}).exec();
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/users')
        .send({
          email: 'testuser@gmail.com',
          password: 'testing',
          confirmPW: 'testing'
        });
      
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('password mismatch', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/users')
        .send({
          email: 'testuser@gmail.com',
          password: 'testing',
          confirmPW: 'test'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('correct input', () => {
    it("should return 200 OK", async () => {
      const res = await request(app).post('/api/users')
        .send({
          email: 'testuser@gmail.com',
          password: 'testing',
          confirmPW: 'testing'
        });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });
  });
});

describe('PATCH /api/users', () => {
  let token: string, response: request.Response;

  beforeAll(async () => {
    const user = new User({
      email: 'testuser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    await user.save();

    response = await request(app).post('/api/auth')
      .send({
        email: 'testuser@gmail.com',
        password: 'testing'
      });

    token = response.body.token;
  });

  afterEach(async () => {
    await User.findOneAndUpdate(
      { email: 'testuser@gmail.com' },
      { password: await bcrypt.hash('testing', 2) }
    ).exec();
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
  })

  describe('no input', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: '',
          password: '',
          confirmPW: ''
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('incorrect password', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'test',
          password: '',
          confirmPW: ''
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('short password', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'testing',
          password: 'test',
          confirmPW: 'test'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('password mismatch', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'testing',
          password: 'testing',
          confirmPW: 'test'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('correct input', () => {
    it("should return 200 OK", async () => {
      const res = await request(app).patch('/api/users')
        .set('x-auth-token', token)
        .send({
          currentPW: 'testing',
          password: 'newtest',
          confirmPW: 'newtest'
        });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});

describe('DELETE /api/users', () => {
  let token: string, response: request.Response;

  beforeAll(async () => {
    const user = new User({
      email: 'testuser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    await user.save();

    response = await request(app).post('/api/auth')
      .send({
        email: 'testuser@gmail.com',
        password: 'testing'
      });

    token = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
  })

  describe('delete user', () => {
    it("should return 200 OK", async () => {
      const res = await request(app).delete('/api/users')
        .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});