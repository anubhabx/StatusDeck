import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet, { hidePoweredBy } from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./lib/env";
import { globalErrorHandler, notFoundHandler, asyncHandler } from "./lib/error";

// Route handlers would be imported here
import userRoutes from "./routes/user.routes";
import monitorRoutes from "./routes/monitors.routes";
import workerRoutes from "./routes/worker.routes";
import { authMiddleware } from "./middleware/auth.middleware";

const { PORT } = env;

// Initialize Express app
const app = express();

// Middleware
app.use(helmet.hidePoweredBy());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://statusdeck.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization", "Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);
app.use(cookieParser());
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

// Test error endpoint
app.get(
  "/api/test-error",
  asyncHandler(async (req: Request, res: Response) => {
    throw new Error("This is a test error");
  })
);

// Test Auth
app.get("/api/test-auth", authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "You are authenticated",
    user: req.user || null
  });
});

// API routes
app.use("/api/users", userRoutes);

app.use("/api/workers", workerRoutes);

app.use("/api/monitors", authMiddleware, monitorRoutes);

app.get("/api", authMiddleware, (req: Request, res: Response) => {
  res.send("Welcome to the StatusDeck API");
});

// Handle 404 for unmatched routes
app.use(notFoundHandler);

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
