import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../types/authRequest';

// @route POST api/users
// @desc Register User
// @access public
export const registerUser = async (req: Request, res: Response) => {
    const { email, password, confirmPW } = req.body;

    try {
      await body('email').isEmail().normalizeEmail().withMessage('Invalid email').run(req);
      await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ errors: 'User already exists' });
      }

      if (password !== confirmPW) {
        return res.status(400).json({ errors: 'Passwords do not match' });
      }

      const hash = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hash,
        accessLevel: 'user',
        reading: []
      });

      await user.save();
      
      const payload = {
        user: {
          id: user._id,
          accessLevel: user.accessLevel
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
      res.status(500).json({ errors: 'User error' });
    }
};

// @route PATCH api/users
// @desc Update User
// @access private
export const updateUser = async (req: AuthRequest, res: Response) => {
    const { currentPW, password, confirmPW } = req.body;
    const { id } = req.user;

    try {
      await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

      // check if password is correct
      const user = await User.findById(id).select('-email -accessLevel');
      const isMatch = await bcrypt.compare(currentPW, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: 'Incorrect password' });
      }

      // check if form data is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if passwords match
      if (password !== confirmPW) {
        return res.status(400).json({ errors: 'Passwords do not match' });
      }

      const hash = await bcrypt.hash(password, 12);

      await User.findByIdAndUpdate(id, { password: hash });

      res.status(200).json({ msg: 'User updated' });
    } catch (err) {
      res.status(500).json({ errors: 'User error' });
    }
};

// @route DELETE api/users
// @desc Delete User
// @access private
export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.user;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'User error' });
  }
};