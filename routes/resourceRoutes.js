import express from "express";
import {
  createResource,
  updateResource,
  getAllResources,
  getResourceById,
  deleteResource,
} from "../controllers/resourceController.js";
import upload from "../middlewares/uploadMiddleware.js";
import protect from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { resourceValidationSchema } from "../validations/resourceValidation.js";

const router = express.Router();

// Admin-only routes
router.post(
  "/create",
  protect,
  checkRole("Admin"),
  upload.single("image"),
  validateRequest(resourceValidationSchema),
  createResource
);
router.put(
  "/update/:id",
  protect,
  checkRole("Admin"),
  upload.single("image"),
  updateResource
);
router.delete("/delete/:id", protect, checkRole("Admin"), deleteResource);

// Public routes (authenticated users)
router.get("/all", protect, getAllResources);
router.get("/byId/:id", protect, getResourceById);

export default router;
