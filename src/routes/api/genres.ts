import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { auth } from '../../lib/auth';
import { Genre } from '../../models/Genre';
import { Manga } from '../../models/Manga';
import { AuthRequest } from '../../types/authRequest';

const router = Router();

// @route POST api/genres
// @desc Create Genre
// @access private
router.post('/', auth,
  body('name').not().isEmpty().trim().escape().withMessage('Name must not be empty'),
  async (req: AuthRequest, res: Response) => {
    const { name } = req.body;
    const { accessLevel } = req.user;

    try {
      if (accessLevel !== 'admin') {
        return res.status(401).json({ errors: 'Authorization denied' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let genre = await Genre.findOne({ name });
      if (genre) {
        return res.status(400).json({ errors: 'Genre already exists' });
      }

      genre = new Genre({ name });

      await genre.save();

      res.status(200).json({ msg: 'Genre created' });
    } catch (err) {
      res.status(500).json({ errors: 'Genre error' });
    }
});

// @route PATCH api/genres/:id
// @desc Update Genre
// @access private
router.patch('/:id', auth,
  body('name').not().isEmpty().trim().escape().withMessage('Name must not be empty'),
  async (req: AuthRequest, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;
    const accessLevel = req.user.accessLevel;

    try {
      if (accessLevel !== 'admin') {
        return res.status(401).json({ errors: 'Authorization denied' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const genre = await Genre.findById(id);
      if (!genre) {
        return res.status(400).json({ errors: 'Genre not found' });
      }
  
      await Genre.findByIdAndUpdate(id, { name });

      res.status(200).json({ msg: 'Genre updated' });
    } catch (err) {
      res.status(500).json({ errors: 'Genre error' });
    }
});

// @route DELETE api/genres
// @desc Delete Genre
// @access private
router.delete('/:id', auth, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const accessLevel = req.user.accessLevel;

  try {
    if (accessLevel !== 'admin') {
      return res.status(401).json({ errors: 'Authorization denied' });
    }

    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(400).json({ errors: 'Genre not found' });
    }

    await Genre.findByIdAndDelete(id);

    /*
    const manga = Manga.find({ $in: { genres: id } });
    if (manga.length > 0) {
      manga.forEach(async (item) => {
        await Manga.findByIdAndUpdate(item._id, { $pull: { genres: id } });
      });
    }
    */

    res.status(200).json({ msg: 'Genre deleted' });
  } catch (err) {
    res.status(500).json({ errors: 'Genre error' });
  }
});

module.exports = router;