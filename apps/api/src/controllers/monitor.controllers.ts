import type { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { asyncHandler, AppError } from "../lib/error";

// Create a new monitor for the authenticated user
const createMonitor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, url, interval } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const monitor = await prisma.monitor.create({
      data: {
        name: name as string,
        url: url as string,
        interval: interval as number,
        userId: userId // This should match your Prisma schema
      }
    });

    res.status(201).json({ success: true, data: monitor });
  }
);

// Get all monitors for the authenticated user
const getMonitors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    // Fix: should filter by userId, not id
    const monitors = await prisma.monitor.findMany({
      where: { userId: userId as string }
    });

    res.status(200).json({ success: true, data: monitors });
  }
);

// Get a single monitor by ID, ensuring it belongs to the authenticated user
const getMonitor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?.id;

    const monitor = await prisma.monitor.findFirst({
      where: {
        id: id as string,
        userId: userId as string
      }
    });

    if (!monitor) {
      return next(new AppError("Monitor not found", 404));
    }

    res.status(200).json({ success: true, data: monitor });
  }
);

// Update a monitor by ID, ensuring it belongs to the authenticated user
const updateMonitor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, url, interval } = req.body;
    const userId = req.user?.id;
    const monitor = await prisma.monitor.findFirst({
      where: {
        id: id as string,
        userId: userId as string
      }
    });
    if (!monitor) {
      return next(new AppError("Monitor not found", 404));
    }
    const updatedMonitor = await prisma.monitor.update({
      where: { id: id as string },
      data: { name, url, interval }
    });
    res.status(200).json({ success: true, data: updatedMonitor });
  }
);

// Delete a monitor by ID, ensuring it belongs to the authenticated user
const deleteMonitor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const monitor = await prisma.monitor.findFirst({
      where: {
        id: id as string,
        userId: userId as string
      }
    });
    if (!monitor) {
      return next(new AppError("Monitor not found", 404));
    }
    await prisma.monitor.delete({
      where: { id: id as string }
    });
    res.status(200).json({ success: true, data: {} });
  }
);

export { createMonitor, getMonitors, getMonitor, updateMonitor, deleteMonitor };
