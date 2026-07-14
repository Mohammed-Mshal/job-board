import { escapeRegex } from "@/lib/escapeRegex";
import { IJobDocument } from "@/models/job.model";
import { JobStatus } from "@/types/job.types";
import type { QueryFilter } from "mongoose";
import { z } from "zod";

export const SORT_BY_VALUES = [
  "createdAt",
  "updatedAt",
  "title",
  "description",
  "company",
  "location",
  "salary",
] as const;

const getJobsQuerySchema = z.object({
  search: z.string().max(200).optional().default(""),
  sortBy: z.enum(SORT_BY_VALUES).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.nativeEnum(JobStatus).optional(),
  location: z.string().max(200).optional(),
  mine: z
    .string()
    .optional()
    .transform((value) => value === "true"),
});

export type GetJobsQuery = z.infer<typeof getJobsQuerySchema>;

export const getJobsQueryValidation = (params: Record<string, string | undefined>) =>
  getJobsQuerySchema.safeParse(params);

export function buildJobsFilter(data: GetJobsQuery): QueryFilter<IJobDocument> {
  const filter: QueryFilter<IJobDocument> = {};

  if (data.status) {
    filter.status = data.status;
  }

  if (data.location) {
    filter.location = { $regex: escapeRegex(data.location), $options: "i" };
  }

  return filter;
}
const salarySchema = z
  .object({
    min: z.number().min(0, { message: "minSalaryGte0" }),
    max: z.number().min(0, { message: "maxSalaryGte0" }),
    salaryPeriod: z.enum(["year", "month"], {
      error: "salaryPeriodRequired"
    }),
    currency: z.string().min(1, { message: "currencyRequired" }),
  })
  .refine((value) => value.min <= value.max, {
    message: "minSalaryLteMax",
    path: ["max"],
  });

const jobFieldsSchema = z.object({
  title: z.string().min(3, { message: "titleMin3" }),
  description: z.string().min(10, { message: "descriptionMin10" }),
  location: z.string().min(1, { message: "locationRequired" }),
  salary: salarySchema,
  requirements: z.array(z.string()).min(1, { message: "atLeastOneRequirement" }),
  experience: z.number().min(0, { message: "experienceMin0" }),
  coreResponsibilities: z.array(z.string()).min(1, { message: "atLeastOneCoreResponsibility" }),
  qualifications: z.array(z.string()).min(1, { message: "atLeastOneQualification" }),
  jobType: z.string().min(1, { message: "jobTypeRequired" }),
  workModel: z.string().min(1, { message: "workModelRequired" }),
  benefits: z.array(z.string()).min(1, { message: "atLeastOneBenefit" }),
  hiringProcess: z.array(z.string()).min(1, { message: "atLeastOneHiringProcess" }),
  FAQ: z.array(z.object({
    question: z.string().min(1, { message: "questionRequired" }),
    answer: z.string().min(1, { message: "answerRequired" }),
  })).min(1, { message: "atLeastOneFaq" }),
  relocation: z.boolean().default(false),
  visaSponsored: z.boolean().default(false),
});

export const createJobSchema = jobFieldsSchema.refine(
  (data) => data.benefits.length >= 1 && data.hiringProcess.length >= 1 && data.FAQ.length >= 1,
  {
    path: ["benefits", "hiringProcess", "FAQ"],
    message: "benefitsHiringFaqRequired",
  }
);
export type CreateJobSchema = z.infer<typeof createJobSchema>;
export const createJobValidation = (data: CreateJobSchema) =>
  createJobSchema.safeParse(data);

export const updateJobSchema = jobFieldsSchema.partial();
export const updateJobValidation = (data: unknown) =>
  updateJobSchema.safeParse(data);

