import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler.js";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

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

    res.cookie("token", token);

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

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = user.generateJWT();

    res.cookie("token", token);

    return res.status(200).json({
      token,
      user: userResponse,
      message: "Login successful.",
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    await blacklistTokenModel.create({
      token,
    });

    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    const avatar = req.file;
    let avatarUrl;

    // Upload file to Pinata
    if (avatar) {
      const pinataResponse = await uploadFile(
        avatar.buffer,
        avatar.originalname,
        avatar.mimetype
      );
      avatarUrl = `${process.env.GATEWAY_URL}/ipfs/${pinataResponse.IpfsHash}`;
    }

    const user = await userModel.findById(id);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        avatar: avatarUrl,
        bio,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Updated user.",
      user: updatedUser,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
