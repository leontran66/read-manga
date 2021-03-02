const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const auth = require('../../lib/auth')
const Manga = require('../../models/Manga')
const User = require('../../models/User')

// @route GET api/manga
// @desc Get All Manga
// @access public
router.get('/', async (req, res) => {
  try {
    const manga = await Manga.find({}).populate('genre')
    if (!manga.length) {
      return res.status(400).json({ error: 'Couldn\'t find any manga' })
    }

    res.status(200).json({ manga })
  } catch (err) {
    res.status(500).json({ error: 'Manga error' })
  }
})

// @route GET api/manga/:id
// @desc Get All Manga
// @access public
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const manga = await Manga.findById(id).populate('genre')
    if (!manga) {
      return res.status(400).json({ error: 'Manga not found' })
    }

    res.status(200).json({ manga })
  } catch (err) {
    res.status(500).json({ error: 'Manga error' })
  }
})

// @route POST api/manga
// @desc Create Manga
// @access private
router.post('/', auth, async (req, res) => {
  const { title, author, synopsis, chapters } = req.body
  const { id } = req.user

  try {
    const user = await User.findById(id)
    if (user.accessLevel !== 'admin') {
      return res.status(400).json({ error: 'Authorization denied' })
    }

    let manga = await Manga.findOne({ title, author })
    if (manga) {
      return res.status(400).json({ error: 'Manga already exists' })
    }

    manga = new Manga({
      title,
      author,
      synopsis,
      chapters
    })

    manga.save()

    res.status(200).json({ msg: 'Manga created' })
  } catch (err) {
    res.status(500).json({ error: 'Manga error' })
  }
})

// @route PATCH api/manga/:id
// @desc Update Manga
// @access private
router.patch('/:id', auth, async (req, res) => {
    const { title, author, genres, synopsis, chapters } = req.body
    const { id } = req.params
    const userID = req.user.id

    try {
      const user = await User.findById(userID)
      if (user.accessLevel !== 'admin') {
        return res.status(400).json({ error: 'Authorization denied' })
      }

      const manga = await Manga.findById(id)
      if (!manga) {
        return res.status(400).json({ error: 'Manga not found' })
      }

      await Manga.findByIdAndUpdate(id, {
        title,
        author,
        genres,
        synopsis,
        chapters
      })

      res.status(200).json({ msg: 'Manga updated' })
    } catch (err) {
      res.status(500).json({ error: 'Manga error' })
    }
})

// @route DELETE api/manga/:id
// @desc Delete Manga
// @access private
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params
  const userID = req.user.id

  try {
    const user = await User.findById(userID)
    if (user.accessLevel !== 'admin') {
      return res.status(400).json({ error: 'Authorization denied' })
    }
    
    const manga = await Manga.findById(id)
    if (!manga) {
      return res.status(400).json({ error: 'Manga not found' })
    }

    await Manga.findByIdAndDelete(id)

    res.status(200).json({ msg: 'Manga deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Manga error' })
  }
})

module.exports = router