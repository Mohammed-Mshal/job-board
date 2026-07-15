import { JobType, WorkModel } from "@/types/job.types";
import { z } from "zod";

const salarySchema = z
  .object({
    min: z.number().min(0),
    max: z.number().min(0),
    salaryPeriod: z.enum(["year", "month"]),
    currency: z.string().min(1),
  })
  .refine((value) => value.min <= value.max, {
    path: ["max"],
    message: "minSalaryLteMax",
  });

export const postJobFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().min(1),
  salary: salarySchema,
  requirements: z.array(z.string()).min(1),
  experience: z.number().min(0),
  coreResponsibilities: z.array(z.string()).min(1),
  qualifications: z.array(z.string()).min(1),
  jobType: z.nativeEnum(JobType),
  workModel: z.nativeEnum(WorkModel),
  benefits: z.array(z.string()).min(1),
  hiringProcess: z.array(z.string()).min(1),
  FAQ: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    )
    .min(1),
  relocation: z.boolean(),
  visaSponsored: z.boolean(),
});

export type PostJobFormValues = z.infer<typeof postJobFormSchema>;

export function sanitizePostJobPayload(values: PostJobFormValues) {
  return {
    ...values,
    requirements: values.requirements.map((item) => item.trim()).filter(Boolean),
    coreResponsibilities: values.coreResponsibilities
      .map((item) => item.trim())
      .filter(Boolean),
    qualifications: values.qualifications.map((item) => item.trim()).filter(Boolean),
    benefits: values.benefits.map((item) => item.trim()).filter(Boolean),
    hiringProcess: values.hiringProcess.map((item) => item.trim()).filter(Boolean),
    FAQ: values.FAQ.filter(
      (item) => item.question.trim().length > 0 && item.answer.trim().length > 0
    ),
  };
}
