import express from "express";

import ContactController from "../controllers/contact.controller";
import { validateContactForm } from "../middlewares";
import { ctrlWrapper, rateLimiter } from "../utils";

const router = express.Router();

router.post(
  "/callback",
  rateLimiter,
  validateContactForm,
  ctrlWrapper(ContactController.requestCallback),
);
router.post(
  "/question",
  rateLimiter,
  validateContactForm,
  ctrlWrapper(ContactController.submitQuestion),
);

export default router;
