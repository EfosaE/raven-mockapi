import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';


const globalErrorHandler = (
  err: AppError, // AppError type for the custom error
  req: Request,
  res: Response,
  next: NextFunction // has to have this next parameter to catch all errors thrown by the next middleware
) => {
  console.log(err, req.originalUrl);

  // Set default status code and status
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err, // You can choose to send specific error properties
      message: err.message,
      stack: err.stack,
    });
  }

  // For non-API routes, still send a JSON error
  res.status(err.statusCode).json({
    message: err.message,
  });
};

export default globalErrorHandler;
