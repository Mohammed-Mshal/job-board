import { escapeRegex } from "@/lib/escapeRegex";
import { Job } from "@/models/job.model";
import { IJob, JobStatus } from "@/types/job.types";
import type {  QueryFilter } from "mongoose";
import { CreateJobSchema, SORT_BY_VALUES } from "./jobs.validation";
import { IUserDocument, User } from "@/models/user.model";

const SORT_FIELD_MAP: Record<(typeof SORT_BY_VALUES)[number], keyof IJob> = {
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  title: "title",
  description: "description",
  company: "company",
  location: "location",
  salary: "salary",
};

const SORT_ORDER_MAP = {
  asc: 1,
  desc: -1,
} as const;

export const jobsRepository = {
  createJob: async (company:IUserDocument, job: CreateJobSchema) => {
    return await Job.create({ ...job, status: JobStatus.OPEN , company });
  },
  getJobs: async (
    search: string,
    sortBy: (typeof SORT_BY_VALUES)[number],
    sortOrder: "asc" | "desc",
    filter: QueryFilter<IJob>,
    page: number,
    limit: number
  ) => {
    const query: QueryFilter<IJob> = { ...filter };
    const term = search.trim();

    if (term) {
      const escaped = escapeRegex(term);
      const matchingCompanies = await User.find({
        name: { $regex: escaped, $options: "i" },
      }).select("_id");
      const companyIds = matchingCompanies.map((company) => company._id);
      const searchClause = {
        $or: [
          { company: { $in: companyIds } },
          { title: { $regex: escaped, $options: "i" } },
          { description: { $regex: escaped, $options: "i" } },
        ],
      };
      query.$and = [...(query.$and ?? []), searchClause];
    }

    const sortField = SORT_FIELD_MAP[sortBy] ?? "createdAt";
    const sortOrderNum = SORT_ORDER_MAP[sortOrder] ?? -1;
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .sort({ [sortField]: sortOrderNum })
        .skip(skip)
        .limit(limit)
        .populate({ path: "company", select: "-password" }),
      Job.countDocuments(query),
    ]);

    return {
      jobs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 0,
    };
  },
  getJobById: async (id: string) => {
    return await Job.findById(id).populate({ path: "company", select: "-password" }).lean();
  },
  updateJob: async (id: string, job: Partial<IJob>) => {
    return await Job.findByIdAndUpdate(id, job, { new: true });
  },
  deleteJob: async (id: string) => {
    return await Job.findByIdAndDelete(id);
  },
};
