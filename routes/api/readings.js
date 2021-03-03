const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../lib/auth')
const Manga = require('../../models/Manga')
const Reading = require('../../models/Reading')
const User = require('../../models/User')

// @route GET api/readings
// @desc Get Reading
// @access private
router.get('/', auth, async (req, res) => {
    const { id } = req.user

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
      })

    res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: 'Reading error' })
    }
});

// @route POST api/readings
// @desc Create Reading
// @access private
router.post('/', auth,
  body('title').not().isEmpty().trim().escape().withMessage('Must have a title'),
  body('currentChapter').toInt(),
  async (req, res) => {
    const { title, currentChapter } = req.body
    const { id } = req.user

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const manga = await Manga.findOne({ title })
      if (!manga) {
        return res.status(400).json({ error: 'Manga not found' })
      }

      if (manga.chapters < currentChapter) {
        return res.status(400).json({ error: 'Current chapter cannot be more than number of chapters in manga' })
      }

      let reading = await Reading.findOne({ user: id, title })
      if (reading) {
        return res.status(400).json({ error: 'Reading already exists for user' })
      }

      reading = new Reading({
        user: id,
        manga: manga._id,
        currentChapter
      })

      reading.save()

      await User.findByIdAndUpdate(id, { $push: { reading } })

      res.status(200).json({ msg: 'Reading created' })
    } catch (err) {
      res.status(500).json({ error: 'Reading error' })
    }
});

// @route PATCH api/readings/:id
// @desc Update Reading
// @access private
router.patch('/:id', auth,
  body('currentChapter').toInt(),
  async (req, res) => {
    const { currentChapter } = req.body
    const { id } = req.params

    try {
      const reading = await Reading.findById(id)
      const manga = await Manga.findById(reading.manga)
      if (manga.chapters < currentChapter) {
        return res.status(400).json({ error: 'Current chapter cannot be more than number of chapters in manga' })
      }

      await Reading.findByIdAndUpdate(id, { currentChapter })

      res.status(200).json({ msg: 'Reading updated' })
    } catch (err) {
      res.status(500).json({ error: 'Reading error' })
    }
})

// @route DELETE api/readings/:id
// @desc Delete Reading
// @access private
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params
  const userID = req.user.id

  try {
    const reading = await Reading.findById(id)
    if (!reading) {
      return res.status(400).json({ error: 'Reading not found' })
    }

    const user = await User.findById(userID)
    if (!user.reading.includes(reading._id)) {
      return res.status(400).json({ error: 'Reading does not belong to user' })
    }

    await Reading.findByIdAndDelete(id)
    await User.findByIdAndUpdate(userID, { $pull: { reading: id } })

    res.status(200).json({ msg: 'Reading deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Reading error' })
  }
})

module.exports = router