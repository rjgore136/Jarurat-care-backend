import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { userValidationSchema } from "../validations/userValidation.js";

const router = express.Router();

// User Registration Route
router.post("/register", validateRequest(userValidationSchema), registerUser);

// User Login Route
router.post("/login", loginUser);

export default router;
