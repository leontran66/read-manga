import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { Genre } from '../src/models/Genre';
import { Manga } from '../src/models/Manga';
import { User } from '../src/models/User';

describe('Test the manga route', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'user@gmail.com',
      password: await bcrypt.hash('testing', 12),
      accessLevel: 'user'
    });
  
    await user.save();
  
    const admin = new User({
      email: 'admin@gmail.com',
      password: await bcrypt.hash('testing', 12),
      accessLevel: 'admin'
    });
  
    await admin.save();

    const action = new Genre({
      name: 'action',
      manga: []
    });

    await action.save();
    
    const adventure = new Genre({
      name: 'adventure',
      manga: []
    });

    await adventure.save();

    const demons = new Genre({
      name: 'demons',
      manga: []
    });

    await demons.save();

    const manga = new Manga({
      title: 'one piece',
      author: 'eiichiro oda',
      synopsis: 'Gol D. Roger, a man referred to as the "Pirate King," is set to ...',
      chapters: 1007
    });

    await manga.save();
  });

  afterAll(async () => {
    await Genre.deleteMany({}).exec();
    await Manga.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  describe('GET /api/manga', () => {
    beforeAll(async () => {
      await Manga.deleteMany({}).exec();
    });

    test('no manga should return 400 Bad Request', async () => {
      const res = await request(app).get('/api/manga');
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Couldn\'t find any manga');
    });

    test('correct input should return 200 OK', async () => {
      const manga = new Manga({
        title: 'one piece',
        author: 'eiichiro oda',
        synopsis: 'Gol D. Roger, a man referred to as the "Pirate King," is set to ...',
        chapters: 1007
      });
  
      await manga.save();

      const res = await request(app).get('/api/manga');
      expect(res.status).toBe(200);
      expect(res.body.manga[0].title).toBe('one piece');
      expect(res.body.manga[0].author).toBe('eiichiro oda');
      expect(res.body.manga[0].synopsis).toBe('Gol D. Roger, a man referred to as the "Pirate King," is set to ...');
      expect(res.body.manga[0].chapters).toBe(1007);
    });
  
    test('correct input with query should return 200 OK', async () => {
      const res = await request(app).get('/api/manga?q=one');
      expect(res.status).toBe(200);
      expect(res.body.manga[0].title).toBe('one piece');
      expect(res.body.manga[0].author).toBe('eiichiro oda');
      expect(res.body.manga[0].synopsis).toBe('Gol D. Roger, a man referred to as the "Pirate King," is set to ...');
      expect(res.body.manga[0].chapters).toBe(1007);
    });
  });

  describe('GET /api/manga/:id', () => {
    let mangaID: string, genreID: string;

    beforeAll(async () => {
      const manga = await Manga.findOne({ title: 'one piece' });

      mangaID = manga._id;

      const genre = await Genre.findOne({ name: 'adventure' });
      genre.manga.push(mangaID);

      await genre.save();

      genreID = genre._id;
    });

    test('non-manga id should return 400 Bad Request', async () => {
      const res = await request(app).get('/api/manga/' + genreID);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Manga not found');
    });

    test('correct input should return 200 OK', async () => {
      const res = await request(app).get('/api/manga/' + mangaID);
      expect(res.status).toBe(200);
      expect(res.body.manga.title).toBe('one piece');
      expect(res.body.manga.author).toBe('eiichiro oda');
      expect(res.body.manga.synopsis).toBe('Gol D. Roger, a man referred to as the "Pirate King," is set to ...');
      expect(res.body.manga.chapters).toBe(1007);
      expect(res.body.genres[0].name).toBe('adventure');
    });
  });

  describe('Test route authorization', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'user@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    test('POST /api/manga from user should return 401 Unauthorized', async () => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token)
        .send({
          title: 'berserk',
          author: 'kentarou miura',
          genres: [],
          synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
          chapters: 357
        });
        expect(res.status).toBe(401);
        expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('PATCH /api/manga from user should return 401 Unauthorized', async () => {
      const manga = await Manga.findOne({ title: 'one piece' });
      const res = await request(app).patch('/api/manga/' + manga._id)
        .set('x-auth-token', token)
        .send({
          title: 'berserk',
          author: 'kentarou miura',
          genres: [],
          synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
          chapters: 357
        });
        expect(res.status).toBe(401);
        expect(res.body.errors[0].msg).toBe('Authorization denied');
    });

    test('DELETE /api/manga from user should return 401 Unauthorized', async () => {
      const manga = await Manga.findOne({ title: 'one piece' });
      const res = await request(app).delete('/api/manga/' + manga._id)
        .set('x-auth-token', token);
        expect(res.status).toBe(401);
        expect(res.body.errors[0].msg).toBe('Authorization denied');
    });
  });

  describe('POST /api/manga', () => {
    let token: string, response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'admin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;
    });

    test('no input should return 400 Bad Request', async() => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Must have a title');
      expect(res.body.errors[1].msg).toBe('Must have an author');
      expect(res.body.errors[2].msg).toBe('Chapters must be a number');
    });

    test('existing manga should return 400 Bad Request', async() => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token)
        .send({
          title: 'One Piece',
          author: 'Eiichiro Oda',
          synopsis: 'Gol D. Roger, a man referred to as the "Pirate King," is set to ...',
          chapters: 1007
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Manga already exists');
    });

    test('correct input should return 200 OK', async() => {
      const res = await request(app).post('/api/manga')
        .set('x-auth-token', token)
        .send({
          title: 'Berserk',
          author: 'Kentarou Miura',
          genres: [],
          synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," i...',
          chapters: 357
        });
      const manga = await Manga.findOne({ title: 'berserk' });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Manga created');
      expect(manga).not.toBeNull();
    });
  });

  describe('PATCH /api/manga/:id', () => {
    let token: string, response: request.Response, mangaID: string, genreID: string;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'admin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;

      const manga = await Manga.findOne({ title: 'one piece' });

      mangaID = manga._id;

      const genre = await Genre.findOne({ name: 'action' });

      genreID = genre._id;
    });

    afterAll(async () => {
      await Manga.findOneAndUpdate(
        { title: 'fullmetal alchemist' },
        {
          title: 'one piece',
          author: 'eiichiro oda',
          synopsis: 'Gol D. Roger, a man referred to as the "Pirate King," is set to ...',
          chapters: 1007
        }
      ).exec();
    });

    test('no input should return 400 Bad Request', async() => {
      const res = await request(app).patch('/api/manga/' + mangaID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Must have a title');
      expect(res.body.errors[1].msg).toBe('Must have an author');
      expect(res.body.errors[2].msg).toBe('Chapters must be a number');
    });

    test('non-manga id should return 400 Bad Request', async() => {
      const res = await request(app).patch('/api/manga/' + genreID)
        .set('x-auth-token', token)
        .send({
          title: 'Fullmetal Alchemist',
          author: 'Hiromu Arakawa',
          genres: [],
          synopsis: 'Alchemists are knowledgeable and naturally talented individu...',
          chapters: 116
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Manga not found');
    });

    test('correct input should return 200 OK', async() => {
      const res = await request(app).patch('/api/manga/' + mangaID)
        .set('x-auth-token', token)
        .send({
          title: 'Fullmetal Alchemist',
          author: 'Hiromu Arakawa',
          genres: [],
          synopsis: 'Alchemists are knowledgeable and naturally talented individu...',
          chapters: 116
        });
      const manga = await Manga.findOne({ _id: mangaID });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Manga updated');
      expect(manga.title).toBe('fullmetal alchemist');
      expect(manga.author).toBe('hiromu arakawa');
      expect(manga.synopsis).toBe('Alchemists are knowledgeable and naturally talented individu...');
      expect(manga.chapters).toBe(116);
    });
  });

  describe('DELETE /api/manga/:id', () => {
    let token: string, response: request.Response, mangaID: string, genreID: string;

    beforeAll(async () => {
      response = await request(app).post('/api/auth')
      .send({
        email: 'admin@gmail.com',
        password: 'testing'
      });

      token = response.body.token;

      const manga = await Manga.findOne({ title: 'one piece' });
      mangaID = manga._id;

      const genre = await Genre.findOne({ name: 'action' });

      genreID = genre._id;
    });

    test('non-manga id should return 400 Bad Request', async() => {
      const res = await request(app).delete('/api/manga/' + genreID)
        .set('x-auth-token', token);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Manga not found');
    });

    test('correct input should return 200 OK', async() => {
      const res = await request(app).delete('/api/manga/' + mangaID)
        .set('x-auth-token', token);
      
      const manga = await Manga.findOne({ _id: mangaID });
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Manga deleted');
      expect(manga).toBeNull();
    });
  });
});
