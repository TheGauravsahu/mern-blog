import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  avatar: {
    type: String,
    trim: true,
  },

  bio: {
    type: String,
    trim: true,
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    required: true,
    trim: true,
  },
});

userSchema.methods.generateJWT = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "24hr",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
