import express from "express";

import AuthController from "../controllers/auth.controller";
import { auth } from "../middlewares";
import { ctrlWrapper } from "../utils";

const router = express.Router();

router.post("/login", ctrlWrapper(AuthController.login));
router.delete("/logout", auth, ctrlWrapper(AuthController.logout));
router.get("/current", auth, ctrlWrapper(AuthController.current));

export default router;
