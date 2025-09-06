import type { Request, Response, NextFunction } from "express";
import { Account, Client } from "node-appwrite";
import { AppError, asyncHandler } from "../lib/error";
import { env } from "../lib/env";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const authMiddleware = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized: No token provided", 401));
    }

    const jwt = authHeader.split(" ")[1];

    if (!jwt) {
      return next(new AppError("Unauthorized: Invalid token format", 401));
    }

    try {
      const client = new Client()
        .setEndpoint(env.APPWRITE_ENDPOINT)
        .setProject(env.APPWRITE_PROJECT_ID)
        .setJWT(jwt);

      const account = new Account(client);

      const user = await account.get();

      req.user = {
        id: user.$id,
        email: user.email || "",
        name: user.name || ""
      };

      next();
    } catch (error) {
      return next(new AppError("Unauthorized: Invalid token", 401));
    }
  }
);

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; name: string };
    }
  }
}
