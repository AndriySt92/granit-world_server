import { CallbackRequest, QuestionRequest } from "../dto";
import { sendEmail } from "../utils";

const requestCallback = async (data: CallbackRequest) => {
  const subject = `Світ граніту. Запит на зворотній дзвінок від ${data.name}`;
  const html = `
    <h2>Запит перезвонити</h2>
    <p><strong>Ім'я:</strong> ${data.name}</p>
    <p><strong>Номер телефону:</strong> ${data.phone}</p>
    <p><strong>Дата та час:</strong> ${new Date().toLocaleString("uk-UA")}</p>
  `;

  return await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject,
    html,
  });
};

const submitQuestion = async (data: QuestionRequest) => {
  const subject = `Світ граніту. Запит дати відповідь на питання від ${data.name}`;
  const html = `
    <h2>Запит відповісти</h2>
    <p><strong>Ім'я:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Питання:</strong></p>
    <p>${data.question}</p>
    <p><strong>Дата та час:</strong> ${new Date().toLocaleString("uk-UA")}</p>
  `;

  return await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject,
    html,
  });
};

export default {
  requestCallback,
  submitQuestion,
};
