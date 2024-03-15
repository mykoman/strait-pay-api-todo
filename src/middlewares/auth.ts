import { RequestHandler } from 'express';
import  { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import ApplicationError from '../helpers/error-response';
import { RESPONSE_CODES } from '../helpers/const';
import { AuthRequest } from '../types/auth';


config();



export const verifyToken: RequestHandler = (req:AuthRequest, _, next) => {
  const token = req.header('Authorization')?.split(" ")[1];

  if (!token) {
    return next(new ApplicationError(RESPONSE_CODES.UNAUTHORIZED, 'Token not provided'));
  }

  verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return next(new ApplicationError(RESPONSE_CODES.UNAUTHORIZED, 'Invalid token'));
    }
    
    // Attach the user to the request for further processing
    req.user = user;

    next();
  });
};
