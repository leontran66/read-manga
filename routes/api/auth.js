const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../../lib/auth')
const User = require('../../models/User')

// @route GET api/auth
// @desc Get Current User
// @access private
router.get('/', auth, async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select('-accessLevel -reading');

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ errors: 'Authentication error' });
  }
});

// @route POST api/auth
// @desc Login User
// @access public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: 'Invalid credentials '});
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user._id
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
})

module.exports = router;