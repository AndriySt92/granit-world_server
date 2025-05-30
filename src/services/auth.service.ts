import bcrypt from "bcryptjs";
import { Response } from "express";

import { LoginData } from "../dto";
import UserModel from "../models/user.model";
import type { User } from "../types";
import { CustomError, generateTokenAndSetCookie } from "../utils";

const login = async (loginData: LoginData, res: Response): Promise<User> => {
  const user = await UserModel.findOne({ email: loginData.email });

  if (!user) {
    throw new CustomError("Invalid username or password", 400);
  }

  const isPasswordCorrect = await bcrypt.compare(loginData.password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError("Invalid username or password", 400);
  }

  generateTokenAndSetCookie({ userId: user._id, res });
  // Exclude the password from the user object before returning
  const { password: _password, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword as User;
};

export default {
  login,
};
