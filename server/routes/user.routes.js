import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  userController.loginUser
);

router.post("/profile", authMiddleware.authUser, userController.logoutUser);
router.post("/logout", authMiddleware.authUser, userController.logoutUser);

export default router;
