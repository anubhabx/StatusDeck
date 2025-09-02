import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { env } from "./lib/env";

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
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
