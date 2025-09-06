import type { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { asyncHandler, AppError } from "../lib/error";

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { appwriteId, email, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { appwriteId: appwriteId as string }
    });

    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    const user = await prisma.user.create({
      data: {
        appwriteId: appwriteId as string,
        email: email as string,
        name: name as string
      }
    });
    
    res.status(201).json({ success: true, data: user });
  }
);
