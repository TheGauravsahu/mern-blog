import { errorHandler } from "../helpers/ErrorHandler.js";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";

export const registerUser = async (req, res, next) => {
  try {
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
