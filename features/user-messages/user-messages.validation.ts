import { z } from "zod";

export const sendUserMessageSchema = z.object({
  userId: z.string().min(1, { message: "fieldRequired" }),
  subject: z.string().min(2, { message: "subjectMin2" }).max(200),
  message: z.string().min(5, { message: "messageMin5" }).max(2000, { message: "messageMax2000" }),
});

export const sendUserMessageValidation = (body: unknown) =>
  sendUserMessageSchema.safeParse(body);

export const markMessageReadSchema = z.object({
  read: z.literal(true),
});
