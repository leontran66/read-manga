const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/User');

describe('GET /api/auth', () => {
  let token, response;

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
        'email': 'testauth@gmail.com',
        'password': 'testing'
      });

    token = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
  });

  it("should return 200 OK", async () => {
    const res = await request(app).get('/api/auth')
      .set('x-auth-token', token);
    expect(res.statusCode).toBe(200);
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
          'email': '',
          'password': ''
        });
      expect(res.statusCode).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('non-existent user', () => {
    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post('/api/auth')
        .send({
          'email': 'testauthuser@gmail.com',
          'password': 'testing'
        });
      expect(res.statusCode).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('incorrect password', () => {
    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post('/api/auth')
        .send({
          'email': 'testauth@gmail.com',
          'password': 'newtest'
        });
      expect(res.statusCode).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('correct input', () => {
    it("should return 200 OK", async () => {
      const res = await request(app).post('/api/auth')
        .send({
          'email': 'testauth@gmail.com',
          'password': 'testing'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });
  });
});
