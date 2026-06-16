import { escapeRegex } from "@/lib/escapeRegex";
import { JobStatus, IJob } from "@/types/job.types";
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
});

export type GetJobsQuery = z.infer<typeof getJobsQuerySchema>;

export const getJobsQueryValidation = (params: Record<string, string | undefined>) =>
  getJobsQuerySchema.safeParse(params);

export function buildJobsFilter(data: GetJobsQuery): QueryFilter<IJob> {
  const filter: QueryFilter<IJob> = {};

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
    min: z.number().min(0, { message: "Min salary must be greater than or equal to 0" }),
    max: z.number().min(0, { message: "Max salary must be greater than or equal to 0" }),
  })
  .refine((value) => value.min <= value.max, {
    message: "Min salary must be less than or equal to max salary",
    path: ["max"],
  });

export const createJobSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  location: z.string().min(1, { message: "Location is required" }),
  salary: salarySchema,
  requirements: z.array(z.string()).min(1, { message: "At least one requirement is required" }),
});
export type CreateJobSchema = z.infer<typeof createJobSchema>;
export const createJobValidation = (data: CreateJobSchema) =>
  createJobSchema.safeParse(data);


