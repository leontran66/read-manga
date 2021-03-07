const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Genre = require('../models/Genre');
const Manga = require('../models/Manga');
const User = require('../models/User');

describe('GET /api/manga', () => {
  afterAll(async () => {
    await Manga.deleteMany({}).exec();
  });

  describe('empty manga collection', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).get('/api/manga');
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('get all manga', () => {
    beforeAll(async () => {
      const manga = new Manga({
        title: 'Berserk',
        author: 'Miura Kentarou',
        genres: [],
        synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," is...',
        chapters: 357
      });
  
      await manga.save();
    });

    it("should return 200 OK", async () => {
      const res = await request(app).get('/api/manga');
      expect(res.statusCode).toBe(200);
      expect(res.body.manga).toBeDefined();
    });
  });
});

describe('GET /api/manga/:id', () => {
  let genreID, mangaID;

  beforeAll(async () => {
    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," is...',
      chapters: 357
    });

    await manga.save();
    mangaID = manga._id;

    
    const genre = new Genre({
      name: 'action'
    });

    await genre.save();

    genreID = genre._id;
  });

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
  });

  describe('invalid manga id', () => {
    it("should return 400 Bad Request", async () => {
      const res = await request(app).get('/api/manga/' + genreID);
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('get manga', () => {
    it("should return 200 OK", async () => {
      const res = await request(app).get('/api/manga/' + mangaID);
      expect(res.statusCode).toBe(200);
      expect(res.body.manga).toBeDefined();
    });
  });
});

describe('POST /api/manga/', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'testmangauser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });
  
    await user.save();
  
    const admin = new User({
      email: 'testmangaadmin@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'admin',
      reading: []
    });
  
    await admin.save();
  
    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
      chapters: 357
    });

    await manga.save();
  });

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('user inserts manga', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangauser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token)
        .send({
          title: 'One Piece',
          author: 'Oda Eiichiro',
          genres: [],
          synopsis: 'Gold Roger, a man referred to as the "Pirate King," is set t...',
          chapters: 1006
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('inserting with no inputs', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token)
        .send({
          title: '',
          author: '',
          genres: [],
          synopsis: '',
          chapters: 0
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('inserting existing manga', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          author: 'Miura Kentarou',
          genres: [],
          synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
          chapters: 357
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('correct inputs', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token)
        .send({
          title: 'One Piece',
          author: 'Oda Eiichiro',
          genres: [],
          synopsis: 'Gold Roger, a man referred to as the "Pirate King," is set t...',
          chapters: 1006
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});

describe('PATCH /api/manga/:id', () => {
  let mangaID;

  beforeAll(async () => {
    const user = new User({
      email: 'testmangauser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });
  
    await user.save();
  
    const admin = new User({
      email: 'testmangaadmin@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'admin',
      reading: []
    });
  
    await admin.save();
  
    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
      chapters: 357
    });

    await manga.save();

    mangaID = manga._id;
  });

  afterAll(async () => {
    await Genre.deleteMany({}).exec();
    await Manga.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('user updates manga', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangauser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/manga/' + mangaID)
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          author: 'Miura Kentarou',
          genres: [],
          synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
          chapters: 358
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('updates with no inputs', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/manga/' + mangaID)
        .set('x-auth-token', token)
        .send({
          title: '',
          author: '',
          genres: [],
          synopsis: '',
          chapters: 0
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('manga not found', () => {
    let token, response, genreID;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    
      const genre = new Genre({
        name: 'Action'
      });
  
      await genre.save();
  
      genreID = genre._id;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).patch('/api/manga/' + genreID)
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          author: 'Miura Kentarou',
          genres: [],
          synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
          chapters: 358
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('correct inputs', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).patch('/api/manga/' + mangaID)
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          author: 'Miura Kentarou',
          genres: [],
          synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
          chapters: 358
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});

describe('DELETE /api/manga/:id', () => {
  let mangaID;

  beforeAll(async () => {
    const user = new User({
      email: 'testmangauser@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'user',
      reading: []
    });
  
    await user.save();
  
    const admin = new User({
      email: 'testmangaadmin@gmail.com',
      password: await bcrypt.hash('testing', 2),
      accessLevel: 'admin',
      reading: []
    });
  
    await admin.save();
  
    const manga = new Manga({
      title: 'Berserk',
      author: 'Miura Kentarou',
      genres: [],
      synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
      chapters: 357
    });

    await manga.save();

    mangaID = manga._id;
  });

  afterAll(async () => {
    await Genre.deleteMany({}).exec();
    await Manga.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('user deletes manga', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangauser@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).delete('/api/manga/' + mangaID)
        .set('x-auth-token', token);
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('manga not found', () => {
    let token, response, genreID;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    
      const genre = new Genre({
        name: 'Action'
      });
  
      await genre.save();
  
      genreID = genre._id;
    });

    it("should return 400 Bad Request", async () => {
      const res = await request(app).delete('/api/manga/' + genreID)
        .set('x-auth-token', token);
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('correct inputs', () => {
    let token, response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'testmangaadmin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    it("should return 200 OK", async () => {
      const res = await request(app).delete('/api/manga/' + mangaID)
        .set('x-auth-token', token);
      expect(res.statusCode).toBe(200);
      expect(res.body.msg).toBeDefined();
    });
  });
});
