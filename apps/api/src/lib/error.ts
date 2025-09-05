import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// Custom error class for application errors
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error response interface
interface ErrorResponse {
  status: "error";
  message: string;
  code?: string;
  details?: any;
  stack?: string;
}

// Global error handling middleware
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let code: string | undefined;
  let details: any;

  // Handle different types of errors
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    code = "APP_ERROR";
  } else if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    code = "VALIDATION_ERROR";
    details = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message
    }));
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    code = "JWT_ERROR";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
    code = "JWT_EXPIRED";
  }

  // Log error for debugging (you might want to use a proper logger)
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent")
  });

  // Prepare error response
  const errorResponse: ErrorResponse = {
    status: "error",
    message,
    ...(code && { code }),
    ...(details && { details })
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = error.stack;
  }

  res.status(statusCode).json(errorResponse);
};

// Async error wrapper for route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler for unmatched routes
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

// Common error factory functions
export const createError = {
  badRequest: (message: string = "Bad Request") => new AppError(message, 400),
  unauthorized: (message: string = "Unauthorized") =>
    new AppError(message, 401),
  forbidden: (message: string = "Forbidden") => new AppError(message, 403),
  notFound: (message: string = "Not Found") => new AppError(message, 404),
  conflict: (message: string = "Conflict") => new AppError(message, 409),
  internal: (message: string = "Internal Server Error") =>
    new AppError(message, 500)
};
