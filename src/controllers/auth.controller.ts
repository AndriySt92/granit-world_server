import { Request, Response } from "express";

import AuthService from "../services/auth.service";

const login = async (req: Request, res: Response): Promise<void> => {
  const loginData = req.body;

  const result = await AuthService.login(loginData, res);

  res.json({ status: "success", message: result.message });
};

const logout = (_req: Request, res: Response): void => {
  res.cookie("auth_token", "", { maxAge: 0 });
  res.status(200).json({ status: "success", message: "Logged out successfully" });
};

export default {
  login,
  logout,
};
