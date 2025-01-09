import { errorHandler } from "../helpers/ErrorHandler.js";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      next(handleError(409, "User already exists."));
    }
    const user = userService.createUser(name, email, password);

    return res.status(200).json({
      success: true,
      user,
      message: "Registration successful.",
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
