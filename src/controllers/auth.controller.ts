import { Request, Response } from "express";

import AuthService from "../services/auth.service";

const login = async (req: Request, res: Response): Promise<void> => {
  const loginData = req.body;

  const user = await AuthService.login(loginData, res);

  res.json({ status: "success", data: user });
};

const logout = (_req: Request, res: Response): void => {
  res.cookie("auth_token", "", { maxAge: 0 });
  res.status(200).json({ status: "success", message: "Logged out successfully" });
};

export const current = async (req: Request, res: Response) => {
  res.json({ status: "success", data: req.user });
};

export default {
  login,
  logout,
  current,
};
