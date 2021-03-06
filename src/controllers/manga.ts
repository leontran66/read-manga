import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Genre } from '../models/Genre';
import { Manga } from '../models/Manga';
import { Reading } from '../models/Reading';
import { AuthRequest } from '../types/authRequest';

// @route GET api/manga
// @desc Get All Manga
// @access public
export const getAllManga = async (req: Request, res: Response): Promise<Response> => {
  const { q } = req.query;

  try {
    // check if manga has any documents
    let manga;
    if (q) {
      manga = await Manga.find({ $text: { $search: q.toString().toLowerCase() } }).sort('title');
    } else {
      manga = await Manga.find({}).sort('title');
    }
    if (manga.length <= 0) {
      return res.status(400).json({ errors: [{ msg: 'Couldn\'t find any manga' }] });
    }

    return res.status(200).json({ manga });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Manga error' }] });
  }
};

// @route POST api/manga
// @desc Create Manga
// @access private
export const createManga = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { title, author, genres, synopsis, chapters, thumbnail } = req.body;
    const { accessLevel } = req.user;

    try {
      await body('title').not().isEmpty().trim().escape().withMessage('Title must not be empty.').run(req);
      await body('author').not().isEmpty().trim().escape().withMessage('Author must not be empty.').run(req);
      await body('synopsis').trim().escape().run(req);
      await body('chapters').isNumeric().withMessage('Chapters must be a number.').run(req);

      // check if input is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if user is admin
      if (accessLevel !== 'admin') {
        return res.status(401).json({ errors: [{ msg: 'Authorization denied' }] });
      }

      // check if manga already exists
      let manga = await Manga.findOne({ title: title.toLowerCase(), author: author.toLowerCase() });
      if (manga) {
        return res.status(400).json({ errors: [{ msg: 'Manga already exists.', param: 'title' }, { msg: 'Manga already exists.', param: 'author' }] });
      }

      manga = new Manga({
        title: title.toLowerCase(),
        author: author.toLowerCase(),
        synopsis,
        chapters,
        thumbnail
      });

      await manga.save();

      if (genres.length > 0) {
        genres.forEach(async (genre: string) => {
          await Genre.findOneAndUpdate({ _id: genre }, { $push: { manga: manga._id } });
        });
      }

      return res.status(200).json({ msg: 'Manga created' });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Manga error' }] });
    }
};

// @route PATCH api/manga/:id
// @desc Update Manga
// @access private
export const updateManga = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { title, author, genres, synopsis, chapters, thumbnail } = req.body;
    const { id } = req.params;
    const accessLevel = req.user.accessLevel;

    try {
      await body('title').not().isEmpty().trim().escape().withMessage('Title must not be empty.').run(req);
      await body('author').not().isEmpty().trim().escape().withMessage('Author must not be empty.').run(req);
      await body('synopsis').trim().escape().run(req);
      await body('chapters').isNumeric().withMessage('Chapters must be a number.').run(req);

      // check if input is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if user is admin
      if (accessLevel !== 'admin') {
        return res.status(401).json({ errors: [{ msg: 'Authorization denied' }] });
      }

      // check if manga exists
      let manga = await Manga.findById(id);
      if (!manga) {
        return res.status(400).json({ errors: [{ msg: 'Manga not found' }] });
      }

      await Manga.findByIdAndUpdate(id, {
        title: title.toLowerCase(),
        author: author.toLowerCase(),
        synopsis,
        chapters,
        thumbnail
      });
      
      await Genre.updateMany({ manga: { $in: [id] } }, { $pull : { manga: id } });

      if (genres.length > 0) {
        genres.forEach(async (genre: string) => {
          await Genre.updateMany({ _id: genre }, { $push: { manga: id } });
        });
      }

      return res.status(200).json({ msg: 'Manga updated.' });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Manga error' }] });
    }
};

// @route DELETE api/manga/:id
// @desc Delete Manga
// @access private
export const deleteManga = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const accessLevel = req.user.accessLevel;

  try {
    // check if user is admin
    if (accessLevel !== 'admin') {
      return res.status(401).json({ errors: [{ msg: 'Authorization denied' }] });
    }
    
    // check if manga exists
    const manga = await Manga.findById(id);
    if (!manga) {
      return res.status(400).json({ errors: [{ msg: 'Manga not found' }] });
    }

    await Manga.findByIdAndDelete(id);

    await Genre.updateMany({ manga: { $in: [id] } }, { $pull: { manga: id } });

    await Reading.deleteMany({ manga: id });

    return res.status(200).json({ msg: 'Manga deleted.' });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Manga error' }] });
  }
};
