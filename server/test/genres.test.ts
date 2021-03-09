import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { Genre } from '../src/models/Genre';
import { User } from '../src/models/User';

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
    });
  
    await admin.save();

    const genre = new Genre({
      name: 'Adventure'
    });

    await genre.save();
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
    await Genre.deleteMany({}).exec();
  })
  
  describe('user adds genre', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreuser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: 'Action'
        });
      expect(res.status).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('no name', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: ''
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('genre already exists', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: 'Adventure'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('correct input', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: 'Action'
        });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});

describe('PATCH /api/genres/:id', () => {
  let genreID: string, userID: string;

  beforeAll(async () => {
    const user = new User({
      email: 'testgenreuser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });
  
    await user.save();

    userID = user._id;
  
    const admin = new User({
      email: 'testgenreadmin@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'admin',
      reading: []
    });
  
    await admin.save();

    const genre = new Genre({
      name: 'Action'
    });

    await genre.save();

    genreID = genre._id;
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
    await Genre.deleteMany({}).exec();
  })
  
  describe('user updates genre', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreuser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 401 Unauthorized", async () => {
      const res = await request(app).patch('/api/genres/' + genreID)
        .set('x-auth-token', token)
        .send({
          name: 'Adventure'
        });
      expect(res.status).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('no name', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/genres/' + genreID)
        .set('x-auth-token', token)
        .send({
          name: ''
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('non-existent genre', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/genres/' +  userID)
        .set('x-auth-token', token)
        .send({
          name: 'Adventure'
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('correct input', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).patch('/api/genres/' + genreID)
        .set('x-auth-token', token)
        .send({
          name: 'Adventure'
        });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});

describe('DELETE /api/genres/:id', () => {
  let genreID: string, userID: string;

  beforeAll(async () => {
    const user = new User({
      email: 'testgenreuser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });
  
    await user.save();

    userID = user._id;
  
    const admin = new User({
      email: 'testgenreadmin@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'admin',
      reading: []
    });
  
    await admin.save();

    const genre = new Genre({
      name: 'Action'
    });

    await genre.save();

    genreID = genre._id;
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
    await Genre.deleteMany({}).exec();
  })
  
  describe('user deletes genre', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreuser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 401 Unauthorized", async () => {
      const res = await request(app).delete('/api/genres/' + genreID)
        .set('x-auth-token', token);
      expect(res.status).toBe(401);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('non-existent genre', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 401 Unauthorized", async () => {
      const res = await request(app).delete('/api/genres/' + userID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  describe('correct input', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testgenreadmin@gmail.com',
        password: 'testing'
      });
      
      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).delete('/api/genres/' + genreID)
        .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});
