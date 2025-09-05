import { Router } from "express";
import {
  createMonitor,
  getMonitors,
  getMonitor,
  updateMonitor,
  deleteMonitor
} from "../controllers/monitor.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Define monitor routes
router.post("/", createMonitor);
router.get("/", getMonitors);
router.get("/:id", getMonitor);
router.put("/:id", updateMonitor);
router.delete("/:id", deleteMonitor);

export default router;
