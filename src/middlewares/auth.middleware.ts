import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model";
import { DecodedToken, User } from "../types";
import CustomError from "../utils/customError";

interface AuthenticatedRequest extends Request {
  user: User;
}

const auth = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies["auth_token"];

    if (!token) throw new CustomError("Unauthorized - No Token Provided", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as DecodedToken;

    if (!decoded.userId) throw new CustomError("Unauthorized - Invalid Token", 401);

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) throw new CustomError("User not found", 404);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
