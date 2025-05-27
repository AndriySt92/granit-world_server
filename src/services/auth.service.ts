import bcrypt from "bcryptjs";
import { Response } from "express";

import { LoginData } from "../dto";
import User from "../models/user.model";
import { CustomError, generateTokenAndSetCookie } from "../utils";

const login = async (loginData: LoginData, res: Response): Promise<{ message: string }> => {
  const user = await User.findOne({ email: loginData.email });

  if (!user) {
    throw new CustomError("Invalid username or password", 400);
  }

  const isPasswordCorrect = await bcrypt.compare(loginData.password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError("Invalid username or password", 400);
  }

  generateTokenAndSetCookie({ userId: user._id, res });

  return { message: "Logined successfully" };
};

export default {
  login,
};
