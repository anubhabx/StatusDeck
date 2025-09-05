import type { Request, Response, NextFunction } from "express";
import { account } from "../lib/appwrite";
import { AppError } from "../lib/error";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract session from Authorization header or cookies
    const sessionId =
      req.headers.authorization?.replace("Bearer ", "") || req.cookies?.session;

    if (!sessionId) {
      return next(new AppError("No session token provided", 401));
    }

    // Get the current user from Appwrite
    const user = await account.get();

    // Attach user info to request object
    req.user = {
      id: user.$id,
      email: user.email,
      name: user.name
    };

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired session", 401));
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}
