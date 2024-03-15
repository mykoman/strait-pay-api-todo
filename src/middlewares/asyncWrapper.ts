import { Request, Response, NextFunction, RequestHandler } from 'express'
export default (wrapFunction: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await wrapFunction(req, res, next)
        } catch (error) {
            return next(error)
        }
    }