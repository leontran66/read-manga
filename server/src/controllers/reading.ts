import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Manga } from '../models/Manga';
import { Reading } from '../models/Reading';
import { User } from '../models/User';
import { AuthRequest } from '../types/authRequest';

// @route GET api/readings
// @desc Get Readings
// @access private
export const getReadings = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { id } = req.user;

    try {
      const readings = await Reading.find({ user: id });
      if (!readings.length) {
        return res.status(400).json({ errors: 'Couldn\'t find any readings' });
      }

      return res.status(200).json({ readings });
    } catch (err) {
      return res.status(500).json({ error: 'Reading error' });
    }
};

// @route POST api/readings
// @desc Create Reading
// @access private
export const createReading = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { title, chapter } = req.body;
    const { id } = req.user;

    try {
      await body('title').not().isEmpty().trim().escape().withMessage('Must have a title').run(req);
      await body('chapter').isNumeric().withMessage('Chapter must be a number').run(req);

      // check if input is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if manga exists
      const manga = await Manga.findOne({ title: title.toLowerCase() });
      if (!manga) {
        return res.status(400).json({ errors: 'Manga not found' });
      }

      // check if reading for user already exists
      let reading = await Reading.findOne({ user: id, manga: manga._id });
      if (reading) {
        return res.status(400).json({ errors: 'Reading already exists for user' });
      }

      // check if chapters is greater than chapters in manga
      if (manga.chapters < chapter) {
        return res.status(400).json({ errors: 'Current chapter cannot be more than number of chapters in manga' });
      }

      reading = new Reading({
        user: id,
        manga: manga._id,
        chapter
      });

      await reading.save();

      return res.status(200).json({ msg: 'Reading created' });
    } catch (err) {
      return res.status(500).json({ errors: 'Reading error' });
    }
};

// @route PATCH api/readings/:id
// @desc Update Reading
// @access private
export const updateReading = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { chapter } = req.body;
    const { id } = req.params;
    const userID = req.user.id;

    try {
      await body('chapter').isNumeric().withMessage('Chapter must be a number').run(req);

      // check if input is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      // check if reading exists
      const reading = await Reading.findById(id);
      if (!reading) {
        return res.status(400).json({ errors: 'Reading not found'});
      }

      // check if reading belongs to user
      const user = await User.findById(userID);
      if (!user._id.equals(reading.user)) {
        return res.status(401).json({ errors: 'Authorization denied' });
      }

      // check if chapters is greater than chapters in manga
      const manga = await Manga.findById(reading.manga);
      if (manga.chapters < chapter) {
        return res.status(400).json({ errors: 'Current chapter cannot be more than number of chapters in manga' });
      }

      await Reading.findByIdAndUpdate(id, { chapter });

      return res.status(200).json({ msg: 'Reading updated' });
    } catch (err) {
      return res.status(500).json({ errors: 'Reading error' });
    }
};

// @route DELETE api/readings/:id
// @desc Delete Reading
// @access private
export const deleteReading = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const userID = req.user.id;

  try {
    // check if reading exists
    const reading = await Reading.findById(id);
    if (!reading) {
      return res.status(400).json({ errors: 'Reading not found' });
    }

    // check if reading belongs to user
    const user = await User.findById(userID);
    if (!user._id.equals(reading.user)) {
      return res.status(401).json({ errors: 'Authorization denied' });
    }

    await Reading.findByIdAndDelete(id);

    return res.status(200).json({ msg: 'Reading deleted' });
  } catch (err) {
    return res.status(500).json({ errors: 'Reading error' });
  }
};
