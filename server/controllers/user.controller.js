import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/ErrorHandler.js";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      next(errorHandler(409, "User already exists."));
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = user.generateJWT();

    return res.status(201).json({
      token,
      user: userResponse,
      message: "Registration successful.",
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      next(errorHandler(404, "Invalid email or password."));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next(errorHandler(400, "Invalid email or password."));
    }

    const token = user.generateJWT();

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      token,
      user: userResponse,
      message: "Login successful.",
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
