const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Manga = require('../models/Manga');

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