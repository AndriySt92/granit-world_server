import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { CustomError } from "../utils";

// Ukrainian phone number regex (matches formats: +380XXXXXXXXX, 0XXXXXXXXX)
const UA_PHONE_REGEX = /^(?:\+?380|0)\d{9}$/;
const NAME_MIN = 3;
const NAME_MAX = 50;
const QUESTION_MIN = 15;
const QUESTION_MAX = 500;
const PHONE_MIN = 10;
const PHONE_MAX = 13;

const baseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(NAME_MIN, `Ім'я має містити щонайменше ${NAME_MIN} символів`)
    .max(NAME_MAX, `Ім'я не може перевищувати ${NAME_MAX} символів`)
    .regex(/^[a-zA-Zа-яІіЇїЄєҐґ\s'-]+$/, {
      message: "Ім'я може містити лише літери, пробіли, апострофи та дефіси",
    }),
});

const callbackSchema = baseSchema.extend({
  phone: z
    .string()
    .trim()
    .min(PHONE_MIN, `Номер телефону має містити щонайменше ${PHONE_MIN} цифр`)
    .max(PHONE_MAX, `Номер телефону не може перевищувати ${PHONE_MAX} цифр`)
    .refine((phone) => UA_PHONE_REGEX.test(phone), {
      message:
        "Будь ласка, введіть дійсний український номер телефону (+380XXXXXXXXX або 0XXXXXXXXX)",
    }),
});

const questionSchema = baseSchema.extend({
  email: z.string().trim().email("Будь ласка, введіть дійсну електронну адресу"),
  question: z
    .string()
    .trim()
    .min(QUESTION_MIN, `Запитання має містити щонайменше ${QUESTION_MIN} символів`)
    .max(QUESTION_MAX, `Запитання не може перевищувати ${QUESTION_MAX} символів`),
});

export const validateContactForm = (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (req.path.includes("/callback")) {
      callbackSchema.parse(req.body);
    } else if (req.path.includes("/question")) {
      questionSchema.parse(req.body);
    } else {
      throw new CustomError("Сталася помилка. Будь ласка, спробуйте ще раз", 400);
    }

    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.errors.map((e) => e.message).join(". ");
      throw new CustomError(errorMessages, 400);
    }
    throw err;
  }
};

export default validateContactForm;
