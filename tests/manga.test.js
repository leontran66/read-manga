const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Manga = require('../models/Manga');

describe('GET /api/manga', () => {
  beforeAll(async () => {
    const manga = new Manga({
      title: '',
      author: '',
      genres: [],
      synopsis: '',
      chapters: 0
    });

    await manga.save();

    
  });

  afterAll(async () => {
    await Manga.deleteMany({}).exec();
  });

  it("should return 200 OK", async () => {
    const res = await request(app).get('/api/auth')
      .set('x-auth-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.manga).toBeDefined();
  });
});