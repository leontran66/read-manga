import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, VerifiedUser } from '../types/authRequest';

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ errors: [{ msg: 'Authorization denied' }] });
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, verified: VerifiedUser) => {
      if (err) { next(err); }
      req.user = verified.user;
    });

    return next();
  } catch (error) {
    return res.status(401).json({ error: [{ msg: 'Authorization denied' }] });
  }
};
