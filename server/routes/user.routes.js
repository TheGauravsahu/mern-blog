import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", userController.registerUser);

export default router
