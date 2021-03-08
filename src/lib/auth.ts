import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestObject extends Request {
  user: string;
};

type VerifiedObject = {
  user: string;
}

export const auth = (req: RequestObject, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ errors: 'Authorization denied' });
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, verified: VerifiedObject) => {
      if (err) { next(err); }
      req.user = verified.user;
    });

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authorization denied' });
  }
};