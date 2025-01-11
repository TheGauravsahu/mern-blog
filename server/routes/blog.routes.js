import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/create",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("image").notEmpty().withMessage("Image is required"),
  ],
  authMiddleware.authUser,
  blogController.createBlog
);

export default router;
