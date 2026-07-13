import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { formatZodErrorToRecord } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { jobsRepository } from "./jobs.repository";
import { buildJobsFilter, CreateJobSchema, createJobValidation, getJobsQueryValidation } from "./jobs.validation";
import { authService } from "../auth/auth.services";
import type { QueryFilter } from "mongoose";
import { IJobDocument } from "@/models/job.model";

export const jobsService = {
  getJobs: async (searchParams: URLSearchParams) => {
    const params = Object.fromEntries(searchParams.entries());
    const result = getJobsQueryValidation(params);

    if (!result.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(result.error) });
    }

    const data = result.data;
    const filter: QueryFilter<IJobDocument> = buildJobsFilter(data);

    if (data.mine) {
      const company = await authService.getCompanyUser();
      filter.company = company._id;
    }

    return await jobsRepository.getJobs(
      data.search,
      data.sortBy,
      data.sortOrder,
      filter,
      data.page,
      data.limit
    );
  },

  createJob: async (job: CreateJobSchema) => {
    const company = await authService.getCompanyUser();
    const result = createJobValidation(job);
    if (!result.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(result.error) });
    }
    return await jobsRepository.createJob(company, result.data);
  },

  updateJob: async (id: string, newData: Partial<CreateJobSchema>) => {
    const company = await authService.getCompanyUser();
    const jobData = await jobsRepository.getJobById(id);
    if (!jobData) {
      throw apiError(404, API_ERROR_CODES.JOB_NOT_FOUND);
    }
    if (company._id.toString() !== jobData.company._id.toString()) {
      throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
    }
    return await jobsRepository.updateJob(id, newData as Partial<IJobDocument>);
  },

  deleteJob: async (id: string) => {
    const company = await authService.getCompanyUser();
    const jobData = await jobsRepository.getJobById(id);
    if (!jobData) {
      throw apiError(404, API_ERROR_CODES.JOB_NOT_FOUND);
    }
    if (jobData.company._id.toString() !== company._id.toString()) {
      throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
    }
    const deletedJob = await jobsRepository.deleteJob(id);
    if (!deletedJob) {
      throw apiError(500, API_ERROR_CODES.FAILED_TO_DELETE_JOB);
    }
    return { message: "Job deleted successfully" };
  },

  getJobById: async (id: string) => {
    const job = await jobsRepository.getJobById(id);
    if (!job) {
      throw apiError(404, API_ERROR_CODES.JOB_NOT_FOUND);
    }
    return job;
  },
};
