import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Genre } from '../models/Genre';
import { AuthRequest } from '../types/authRequest';

// @route POST api/genres
// @desc Create Genre
// @access private
export const createGenre = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { name } = req.body;
    const { accessLevel } = req.user;

    try {
      await body('name').not().isEmpty().trim().escape().withMessage('Name must not be empty').run(req);

      // check if input is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if user is admin
      if (accessLevel !== 'admin') {
        return res.status(401).json({ errors: [{ msg: 'Authorization denied' }] });
      }

      // check if genre already exists
      let genre = await Genre.findOne({ name: name.toLowerCase() });
      if (genre) {
        return res.status(400).json({ errors: [{ msg: 'Genre already exists' }] });
      }

      genre = new Genre({
        name: name.toLowerCase(),
        manga: []
      });

      await genre.save();

      return res.status(200).json({ msg: 'Genre created' });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Genre error' }] });
    }
};

// @route PATCH api/genres/:id
// @desc Update Genre
// @access private
export const updateGenre = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { name } = req.body;
    const { id } = req.params;
    const accessLevel = req.user.accessLevel;

    try {
      await body('name').not().isEmpty().trim().escape().withMessage('Name must not be empty').run(req);

      // check if input is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if user is admin
      if (accessLevel !== 'admin') {
        return res.status(401).json({ errors: [{ msg: 'Authorization denied' }] });
      }

      // check if genre exists
      let genre = await Genre.findById(id);
      if (!genre) {
        return res.status(400).json({ errors: [{ msg: 'Genre not found' }] });
      }
  
      // check if genre already exists
      genre = await Genre.findOne({ name: name.toLowerCase() });
      if (genre) {
        return res.status(400).json({ errors: [{ msg: 'Genre already exists' }] });
      }

      await Genre.findByIdAndUpdate(id, { name: name.toLowerCase() });

      return res.status(200).json({ msg: 'Genre updated' });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Genre error' }] });
    }
};

// @route DELETE api/genres
// @desc Delete Genre
// @access private
export const deleteGenre = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const accessLevel = req.user.accessLevel;

  try {
    // check if user is admin
    if (accessLevel !== 'admin') {
      return res.status(401).json({ errors: [{ msg: 'Authorization denied' }] });
    }

    // check if genre exists
    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(400).json({ errors: [{ msg: 'Genre not found' }] });
    }

    await Genre.findByIdAndDelete(id);

    return res.status(200).json({ msg: 'Genre deleted' });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Genre error' }] });
  }
};
