import userModel from "../models/user.model";

export const createUser = async ({ name, email, password }) => {
  try {
    if (!name || !email || !password) {
      throw Error("All fields are required.");
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });

    return user;
  } catch (error) {}
};
