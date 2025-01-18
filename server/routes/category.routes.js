import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/create",
  [body("name").trim().notEmpty().withMessage("Name is required.")],
  authMiddleware.authUser,
  categoryController.createCategory
);

router.get("/", categoryController.getAllCategories);

router.get(
  "/:id",
  authMiddleware.authUser,
  categoryController.getCategoryDetails
);

router.put(
  "/update/:id",
  [body("name").trim().notEmpty().withMessage("Name is required.")],
  authMiddleware.authUser,
  categoryController.updateCategory
);

router.delete(
  "/delete/:id",
  authMiddleware.authUser,
  categoryController.deleteCategory
);

export default router;
