import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { User } from '../src/models/User';

describe('GET /api/auth', () => {
  let token: string, response: request.Response;

  beforeAll(async () => {
    const user = new User({
      email: 'testauth@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    await user.save();

    response = await request(app).post('/api/auth')
      .send({
        email: 'testauth@gmail.com',
        password: 'testing'
      });

    token = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
  });

  it("should return 200 OK", async () => {
    const res = await request(app).get('/api/auth')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
  });
});

describe('POST /api/auth', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'testauth@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
  });
  
  describe('no input', () => {
    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post('/api/auth')
        .send({
          email: '',
          password: ''
        });
      expect(res.status).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('non-existent user', () => {
    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post('/api/auth')
        .send({
          email: 'testauthuser@gmail.com',
          password: 'testing'
        });
      expect(res.status).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('incorrect password', () => {
    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post('/api/auth')
        .send({
          email: 'testauth@gmail.com',
          password: 'newtest'
        });
      expect(res.status).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('correct input', () => {
    it("should return 200 OK", async () => {
      const res = await request(app).post('/api/auth')
        .send({
          email: 'testauth@gmail.com',
          password: 'testing'
        });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });
  });
});
