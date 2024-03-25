import { NextFunction, Request, RequestHandler, Response } from "express";
export interface AuthRequest extends Request {
  user?: any;
}

export interface AuthRequestHandler {
  (req: AuthRequest, res: Response, next?: NextFunction): any;
}
