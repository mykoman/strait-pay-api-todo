import { config } from 'dotenv';
import logger from '../helpers/logger';
import { NextFunction, Request, Response } from 'express';
import ApplicationError from '../helpers/error-response';

config();


export default (error: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    const isProduction = process.env.NODE_ENV === 'production';
    let errorMessages: Error | null = null; // Change type to Error | null
    if (res.headersSent) return next(error);
    if (!isProduction) {
        logger.error(error.stack);
        errorMessages = error;
    }
    return res.status(error.status || 500).json({
        status: 'error',
        error: {
            message: error.message,
            ...(!isProduction && { trace: errorMessages }),
        },
    });
};
