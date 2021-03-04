const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Genre = require('../models/Genre');
const User = require('../models/User');

describe('POST /api/genres', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'testgenreuser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });
  
    await user.save();
  
    const admin = new User({
      email: 'testgenreadmin@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'admin',
      reading: []
    })
  
    await admin.save();
  });

  afterEach(async () => {
    await Genre.deleteMany({}).exec();
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
    await Genre.deleteMany({}).exec();
  })
  
  describe('users adds genre', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        'email': 'testgenreuser@gmail.com',
        'password': 'testing'
      });

      token = response.body.token;
    });

    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          'name': 'adventure'
        });
      expect(res.statusCode).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('no name', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        'email': 'testgenreadmin@gmail.com',
        'password': 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          'name': ''
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('correct input', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        'email': 'testgenreadmin@gmail.com',
        'password': 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          'name': 'action'
        });
      console.log(res.body);
      expect(res.statusCode).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});