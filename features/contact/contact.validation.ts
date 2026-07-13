import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "nameMin2" }),
  email: z.string().email({ message: "invalidEmail" }),
  subject: z.string().min(3, { message: "subjectMin3" }),
  message: z
    .string()
    .min(10, { message: "messageMin10" })
    .max(2000, { message: "messageMax2000" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const contactValidation = (data: ContactFormData) =>
  contactSchema.safeParse(data);
