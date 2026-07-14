import { z } from "zod";

export const applyForJobSchema = z.object({
  jobId: z.string().min(1, { message: "fieldRequired" }),
  coverLetter: z
    .string()
    .min(20, { message: "messageMin10" })
    .max(5000, { message: "messageMax2000" }),
});

export const applyForJobValidation = (data: unknown) =>
  applyForJobSchema.safeParse(data);
