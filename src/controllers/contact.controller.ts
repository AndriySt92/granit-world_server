import { Request, Response } from "express";

import ContactService from "../services/contact.service";
import { CustomError } from "../utils";

const requestCallback = async (req: Request, res: Response) => {
  const { name, phone } = req.body;

  const success = await ContactService.requestCallback({ name, phone });

  if (!success) {
    throw new CustomError("Сталася помилка. Будь ласка, спробуйте ще раз", 500);
  }

  res.json({
    status: "success",
    message: "Запит на дзвінок успішно надіслано",
  });
};

const submitQuestion = async (req: Request, res: Response) => {
  const { name, email, question } = req.body;

  const success = await ContactService.submitQuestion({ name, email, question });

  if (!success) {
    throw new CustomError("Сталася помилка. Будь ласка, спробуйте ще раз", 500);
  }

  res.json({
    status: "success",
    message: "Питання успішно надіслано",
  });
};

export default {
  requestCallback,
  submitQuestion,
};
