import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { env } from '../../lib/env';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error
  let error = {
    message: err.message || 'Something went wrong',
    statusCode: 500,
    stack: err.stack,
    isOperational: false
  };

  // Zod validation error
  if (err instanceof ZodError) {
    error = {
      message: 'Validation error',
      statusCode: 400,
      stack: err.stack,
      isOperational: true
    };
  }

  // Custom AppError
  if (err instanceof AppError) {
    error = {
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack,
      isOperational: err.isOperational
    };
  }

  // Send error response
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(env.NODE_ENV === 'development' && { stack: error.stack })
  });
};