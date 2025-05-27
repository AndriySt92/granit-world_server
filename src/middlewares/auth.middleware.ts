import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model";
import { IDecodedToken } from "../types/user.interface";
import CustomError from "../utils/customError";

const auth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies["auth_token"];

    if (!token) throw new CustomError("Unauthorized - No Token Provided", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as IDecodedToken;

    if (!decoded.userId) throw new CustomError("Unauthorized - Invalid Token", 401);

    const user = await userModel.findById(decoded.userId);
    if (!user) throw new CustomError("User not found", 404);

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
