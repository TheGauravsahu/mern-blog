import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import upload from "../config/multer.config.js";

const router = Router();

router.post(
  "/create",
  [
    upload.single("image"),
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  authMiddleware.authUser,
  blogController.createBlog
);

router.get("/", blogController.listAllBlogs);

router.get("/:category/all", blogController.listCategoryBlogs);

router.get("/me", authMiddleware.authUser, blogController.listUserBlogs);

router.get("/:slug", blogController.getBlogDetails);

router.patch("/:slug", authMiddleware.authUser, blogController.updateBlog);

router.delete("/:slug", authMiddleware.authUser, blogController.deleteBlog);

export default router;
