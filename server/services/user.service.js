import userModel from "../models/user.model.js";

export const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw Error("All fields are required.");
  }
  const user = new userModel({
    name,
    email,
    password,
  });

  await user.save();
  
  return user;
};
