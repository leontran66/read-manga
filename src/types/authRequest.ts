import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: string;
    accessLevel: string;
  }
};

export interface VerifiedUser {
  user: {
    id: string;
    accessLevel: string;
  }
}
