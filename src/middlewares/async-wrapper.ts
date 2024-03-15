import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";
import ApplicationError from "../helpers/error-response";
export default (wrapFunction: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApplicationError(
          400,
          errors
            .array()
            .map((err) => err.msg)
            .join(", ")
        );
      }
      await wrapFunction(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
