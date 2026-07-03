import { formatZodErrorToRecord } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { jobsRepository } from "./jobs.repository";
import { buildJobsFilter, CreateJobSchema, createJobValidation, getJobsQueryValidation } from "./jobs.validation";
import { authService } from "../auth/auth.services";
import { IJob } from "@/types/job.types";

export const jobsService = {
  getJobs: async (searchParams: URLSearchParams) => {
    const params = Object.fromEntries(searchParams.entries());
    const result = getJobsQueryValidation(params);

    if (!result.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(result.error) });
    }

    const data = result.data;
    const filter = buildJobsFilter(data);

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

  updateJob: async (id: string, newData: Partial<IJob>) => {
    const company = await authService.getCompanyUser();
    const jobData = await jobsRepository.getJobById(id);
    if (!jobData) {
      throw new HttpError(404, { error: "Job not found" });
    }
    if (company._id.toString() !== jobData.company._id.toString()) {
      throw new HttpError(401, { error: "Unauthorized" });
    }
    return await jobsRepository.updateJob(id, newData);
  },

  deleteJob: async (id: string) => {
    const company = await authService.getCompanyUser();
    const jobData = await jobsRepository.getJobById(id);
    if (!jobData) {
      throw new HttpError(404, { error: "Job not found" });
    }
    if (jobData.company._id.toString() !== company._id.toString()) {
      throw new HttpError(401, { error: "Unauthorized" });
    }
    const deletedJob = await jobsRepository.deleteJob(id);
    if (!deletedJob) {
      throw new HttpError(500, { error: "Failed to delete job" });
    }
    return { message: "Job deleted successfully" };
  },

  getJobById: async (id: string) => {
    const job = await jobsRepository.getJobById(id);
    if (!job) {
      throw new HttpError(404, { error: "Job not found" });
    }
    return job;
  },
};
