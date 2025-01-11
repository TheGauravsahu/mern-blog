import { errorHandler } from "../helpers/errorHandler.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const isBlacklistedToken = await blacklistTokenModel.findOne({ token });
    if (isBlacklistedToken) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findById(decoded?._id);

    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    next(errorHandler(400, error.message));
  }
};
