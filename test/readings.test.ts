import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { Manga } from '../src/models/Manga';
import { Reading } from '../src/models/Reading';
import { User } from '../src/models/User';

describe('GET /api/readings', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'testreadings@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    await user.save();

    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," is...',
      chapters: 357
    });

    await manga.save();

    const reading = new Reading({
      user: user._id,
      manga: manga._id,
      chapter: 350
    });

    await reading.save();
  });

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
    await Reading.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('get user readings', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).get('/api/readings')
        .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body.user).toBeDefined();
    });
  });
});

describe('POST /api/readings', () => {
  let userID: string, mangaID: string;

  beforeAll(async () => {
    const user = new User({
      email: 'testreadings@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    await user.save();

    userID = user._id;

    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," is...',
      chapters: 357
    });

    await manga.save();

    mangaID = manga._id;
  });

  afterEach(async () => {
    await Reading.deleteMany({}).exec();
  })

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('invalid input', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: '',
          chapter: 0.5
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('non-existent manga', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'One Piece',
          chapter: 1005
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('current chapter greater than manga chapters', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 400
        });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('reading for same title already exists', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      const reading = new Reading({
        user: userID,
        manga: mangaID,
        chapter: 350
      });

      await reading.save();

      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 350
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
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).post('/api/readings')
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          chapter: 350
        });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});

describe('PATCH /api/readings/:id', () => {
  let readingID: string;

  beforeAll(async () => {
    const user = new User({
      email: 'testreadings@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    await user.save();

    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," is...',
      chapters: 357
    });

    await manga.save();

    const reading = new Reading({
      user: user._id,
      manga: manga._id,
      chapter: 350
    });

    await reading.save();

    readingID = reading._id;
  });

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
    await Reading.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('current chapter greater than manga chapters', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/readings/' + readingID)
        .set('x-auth-token', token)
        .send({
          chapter: 400
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
        email: 'testreadings@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).patch('/api/readings/' + readingID)
        .set('x-auth-token', token)
        .send({
          chapter: 357
        });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});

describe('DELETE /api/readings/:id', () => {
  let readingID: string, mangaID: string;

  beforeAll(async () => {
    const admin = new User({
      email: 'testreadingsadmin@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'admin',
      reading: []
    });

    await admin.save();

    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," is...',
      chapters: 357
    });

    await manga.save();

    mangaID = manga._id;

    const user = new User({
      email: 'testreadingsuser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });

    const reading = new Reading({
      user: user._id,
      manga: manga._id,
      chapter: 350
    });

    user.reading = [reading._id];

    await reading.save();

    await user.save();

    readingID = reading._id;

  });

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
    await Reading.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('non-existent reading', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadingsuser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).delete('/api/readings/' + mangaID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('another users reading', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testreadingsadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).delete('/api/readings/' + readingID)
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
        email: 'testreadingsuser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).delete('/api/readings/' + readingID)
        .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});
