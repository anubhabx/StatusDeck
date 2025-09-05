import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { env } from "./lib/env";
import { globalErrorHandler, notFoundHandler, asyncHandler } from "./lib/error";

// Route handlers would be imported here
import monitorRoutes from "./routes/monitors.routes";

const { PORT } = env;

// Initialize Express app
const app = express();

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "Server is running",
      timestamp: new Date().toISOString()
    });
  })
);

// Example route using asyncHandler and error handling
app.get(
  "/api/test-error",
  asyncHandler(async (req: Request, res: Response) => {
    throw new Error("This is a test error");
  })
);

// API routes
app.use("/api/monitors", monitorRoutes);

// Handle 404 for unmatched routes
app.use(notFoundHandler);

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
