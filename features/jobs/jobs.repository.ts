import { escapeRegex } from "@/lib/escapeRegex";
import { IJobDocument, Job } from "@/models/job.model";
import { JobStatus } from "@/types/job.types";
import type { QueryFilter } from "mongoose";
import { CreateJobSchema, SORT_BY_VALUES } from "./jobs.validation";
import { IUserDocument, User } from "@/models/user.model";

const SORT_FIELD_MAP: Record<(typeof SORT_BY_VALUES)[number], keyof IJobDocument> = {
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
    filter: QueryFilter<IJobDocument>,
    page: number,
    limit: number
  ) => {
    const query: QueryFilter<IJobDocument> = { ...filter };
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
        .populate({ path: "company", select: "-password", populate:"profileImage" }),
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
    return await Job.findOne({jobId:id}).populate({ path: "company", select: "-password" ,populate:'profileImage'}).lean();
  },
  updateJob: async (id: string, job: Partial<IJobDocument>) => {
    return await Job.findOneAndUpdate({ jobId: id }, job, { new: true });
  },
  deleteJob: async (id: string) => {
    return await Job.findOneAndDelete({jobId:id});
  },
};
