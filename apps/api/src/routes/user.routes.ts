import { Router } from "express";
import { createUser } from "../controllers/user.controllers";

const router = Router();

// Route to create a new user
router.post("/", createUser);

export default router;
