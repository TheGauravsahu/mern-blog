import { errorHandler } from "../helpers/ErrorHandler";
import blacklistTokenModel from "../models/blacklistToken.model";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

export const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[0] || req.cookies.token;
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const isBlacklistedToken = await blacklistTokenModel.findOne({ token });
    if (isBlacklistedToken) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
