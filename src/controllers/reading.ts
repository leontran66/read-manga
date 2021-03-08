import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Manga } from '../models/Manga';
import { Reading } from '../models/Reading';
import { User } from '../models/User';
import { AuthRequest } from '../types/authRequest';

// @route GET api/readings
// @desc Get Readings
// @access private
export const getReadings = async (req: AuthRequest, res: Response) => {
    const { id } = req.user;

    try {
      const user = await User.findById(id)
      .select('reading')
      .populate({
        path: 'reading',
        model: 'Reading',
        populate: {
          path: 'manga',
          model: 'Manga',
          populate : {
            path: 'genres',
            model: 'Genre'
          }
        }
      });

      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: 'Reading error' });
    }
};

// @route POST api/readings
// @desc Create Reading
// @access private
export const createReading = async (req: AuthRequest, res: Response) => {
    const { title, chapter } = req.body;
    const { id } = req.user;

    try {
      await body('title').not().isEmpty().trim().escape().withMessage('Must have a title').run(req);
      await body('chapter').isNumeric().withMessage('Chapter must be a number').run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const manga = await Manga.findOne({ title });
      if (!manga) {
        return res.status(400).json({ errors: 'Manga not found' });
      }

      if (manga.chapters < chapter) {
        return res.status(400).json({ errors: 'Current chapter cannot be more than number of chapters in manga' });
      }

      let reading = await Reading.findOne({ user: id, manga: manga._id });
      if (reading) {
        return res.status(400).json({ errors: 'Reading already exists for user' });
      }

      reading = new Reading({
        user: id,
        manga: manga._id,
        chapter
      });

      await reading.save();

      await User.findByIdAndUpdate(id, { $push: { reading } });

      res.status(200).json({ msg: 'Reading created' });
    } catch (err) {
      res.status(500).json({ errors: 'Reading error' });
    }
};

// @route PATCH api/readings/:id
// @desc Update Reading
// @access private
export const updateReading = async (req: AuthRequest, res: Response) => {
    const { chapter } = req.body;
    const { id } = req.params;

    try {
      await body('chapter').isNumeric().withMessage('Chapter must be a number').run(req);

      const reading = await Reading.findById(id);
      const manga = await Manga.findById(reading.manga);
      if (manga.chapters < chapter) {
        return res.status(400).json({ errors: 'Current chapter cannot be more than number of chapters in manga' });
      }

      await Reading.findByIdAndUpdate(id, { chapter });

      res.status(200).json({ msg: 'Reading updated' });
    } catch (err) {
      res.status(500).json({ errors: 'Reading error' });
    }
};

// @route DELETE api/readings/:id
// @desc Delete Reading
// @access private
export const deleteReading = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userID = req.user.id;

  try {
    const reading = await Reading.findById(id);
    if (!reading) {
      return res.status(400).json({ errors: 'Reading not found' });
    }

    const user = await User.findById(userID);
    if (!user.reading.includes(reading._id)) {
      return res.status(400).json({ errors: 'Reading does not belong to user' });
    }

    await Reading.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userID, { $pull: { reading: id } });

    res.status(200).json({ msg: 'Reading deleted' });
  } catch (err) {
    res.status(500).json({ errors: 'Reading error' });
  }
};