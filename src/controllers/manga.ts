import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Manga } from '../models/Manga';
import { AuthRequest } from '../types/authRequest';

// @route GET api/manga
// @desc Get All Manga
// @access public
export const getAllManga = async (req: Request, res: Response) => {
  try {
    const manga = await Manga.find({}).populate('genre');
    if (!manga.length) {
      return res.status(400).json({ errors: 'Couldn\'t find any manga' });
    }

    res.status(200).json({ manga });
  } catch (err) {
    res.status(500).json({ errors: 'Manga error' });
  }
};

// @route GET api/manga/:id
// @desc Get All Manga
// @access public
export const getManga = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const manga = await Manga.findById(id).populate('genre');
    if (!manga) {
      return res.status(400).json({ errors: 'Manga not found' });
    }

    res.status(200).json({ manga });
  } catch (err) {
    res.status(500).json({ errors: 'Manga error' });
  }
};

// @route POST api/manga
// @desc Create Manga
// @access private
export const createManga = async (req: AuthRequest, res: Response) => {
    const { title, author, synopsis, chapters } = req.body;
    const { accessLevel } = req.user;

    try {
      await body('title').not().isEmpty().trim().escape().withMessage('Must have a title').run(req);
      await body('author').not().isEmpty().trim().escape().withMessage('Must have an author').run(req);
      await body('synopsis').trim().escape().run(req);
      await body('chapters').isNumeric().withMessage('Chapters must be a number').run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (accessLevel !== 'admin') {
        return res.status(400).json({ errors: 'Authorization denied' });
      }

      let manga = await Manga.findOne({ title, author });
      if (manga) {
        return res.status(400).json({ errors: 'Manga already exists' });
      }

      manga = new Manga({
        title,
        author,
        synopsis,
        chapters
      });

      await manga.save();

      res.status(200).json({ msg: 'Manga created' });
    } catch (err) {
      res.status(500).json({ errors: 'Manga error' });
    }
};

// @route PATCH api/manga/:id
// @desc Update Manga
// @access private
export const updateManga = async (req: AuthRequest, res: Response) => {
    const { title, author, genres, synopsis, chapters } = req.body;
    const { id } = req.params;
    const accessLevel = req.user.accessLevel;

    try {
      await body('title').not().isEmpty().trim().escape().withMessage('Must have a title').run(req);
      await body('author').not().isEmpty().trim().escape().withMessage('Must have an author').run(req);
      await body('synopsis').trim().escape().run(req);
      await body('chapters').isNumeric().withMessage('Chapters must be a number').run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (accessLevel !== 'admin') {
        return res.status(400).json({ errors: 'Authorization denied' });
      }


      const manga = await Manga.findById(id);
      if (!manga) {
        return res.status(400).json({ errors: 'Manga not found' });
      }

      await Manga.findByIdAndUpdate(id, {
        title,
        author,
        genres,
        synopsis,
        chapters
      });

      res.status(200).json({ msg: 'Manga updated' });
    } catch (err) {
      res.status(500).json({ errors: 'Manga error' });
    }
};

// @route DELETE api/manga/:id
// @desc Delete Manga
// @access private
export const deleteManga = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const accessLevel = req.user.accessLevel;

  try {
    if (accessLevel !== 'admin') {
      return res.status(400).json({ errors: 'Authorization denied' });
    }
    
    const manga = await Manga.findById(id);
    if (!manga) {
      return res.status(400).json({ errors: 'Manga not found' });
    }

    await Manga.findByIdAndDelete(id);

    res.status(200).json({ msg: 'Manga deleted' });
  } catch (err) {
    res.status(500).json({ errors: 'Manga error' });
  }
};