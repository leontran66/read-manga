const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../lib/auth')
const Genre = require('../../models/Genre')
const Manga = require('../../models/Manga')
const User = require('../../models/User')

// @route POST api/genres
// @desc Create Genre
// @access private
router.post('/', auth,
  body('name').not().isEmpty().trim().escape().withMessage('Name must not be empty'),
  async (req, res) => {
    const { name } = req.body;
    const { id } = req.user;

    try {
      const user = await User.findById(id);
      if (user.accessLevel !== 'admin') {
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
  async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const userID = req.user.id;

    try {
      const user = await User.findById(userID);
      if (user.accessLevel !== 'admin') {
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
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;

  try {
    const user = await User.findById(userID);
    if (user.accessLevel !== 'admin') {
      return res.status(401).json({ errors: 'Authorization denied' });
    }

    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(400).json({ errors: 'Genre not found' });
    }

    await Genre.findByIdAndDelete(id);

    const manga = Manga.find({ $in: { genres: id } });
    if (manga.length > 0) {
      manga.forEach(async (item) => {
        await Manga.findByIdAndUpdate(item._id, { $pull: { genres: id } });
      });
    }

    res.status(200).json({ msg: 'Genre deleted' });
  } catch (err) {
    res.status(500).json({ errors: 'Genre error' });
  }
});

module.exports = router;