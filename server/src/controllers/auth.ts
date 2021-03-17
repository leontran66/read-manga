import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../types/authRequest';

// @route GET api/auth
// @desc Get Current User
// @access private
export const getUser = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select('email');

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Authentication error' }] });
  }
};

// @route POST api/auth
// @desc Login User
// @access public
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

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
        return res.status(200).json({ token });
      }
    );
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Authentication error' }] });
  }
};
