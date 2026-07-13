import { escapeRegex } from "@/lib/escapeRegex";
import { Job } from "@/models/job.model";
import { IUserDocument, User } from "@/models/user.model";
import { USER_ROLES } from "@/constants/roles";
import { ICompany } from "@/types/company.types";
import { JobStatus } from "@/types/job.types";
import type { QueryFilter } from "mongoose";
import { COMPANY_SORT_BY_VALUES } from "./companies.validation";

const SORT_FIELD_MAP: Record<
  (typeof COMPANY_SORT_BY_VALUES)[number],
  keyof IUserDocument
> = {
  createdAt: "createdAt",
  name: "name",
};

const SORT_ORDER_MAP = {
  asc: 1,
  desc: -1,
} as const;

async function attachOpenJobsCount(companies: unknown[]): Promise<ICompany[]> {
  if (!companies.length) return [];

  const companyRecords = companies as Array<{ _id: unknown } & Record<string, unknown>>;
  const companyIds = companyRecords.map((company) => company._id);
  const jobCounts = await Job.aggregate<{ _id: unknown; count: number }>([
    {
      $match: {
        company: { $in: companyIds },
        status: JobStatus.OPEN,
      },
    },
    { $group: { _id: "$company", count: { $sum: 1 } } },
  ]);

  const countMap = new Map(
    jobCounts.map((item) => [String(item._id), item.count])
  );

  return companyRecords.map((company) => ({
    ...(company as unknown as ICompany),
    openJobsCount: countMap.get(String(company._id)) ?? 0,
  }));
}

export const companiesRepository = {
  getCompanies: async (
    search: string,
    sortBy: (typeof COMPANY_SORT_BY_VALUES)[number],
    sortOrder: "asc" | "desc",
    filter: QueryFilter<IUserDocument>,
    page: number,
    limit: number
  ) => {
    const query: QueryFilter<IUserDocument> = {
      role: USER_ROLES.COMPANY,
      ...filter,
    };
    const term = search.trim();

    if (term) {
      const escaped = escapeRegex(term);
      query.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
      ];
    }

    const sortField = SORT_FIELD_MAP[sortBy] ?? "createdAt";
    const sortOrderNum = SORT_ORDER_MAP[sortOrder] ?? -1;
    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      User.find(query)
        .select("-password -email -savedJobs")
        .sort({ [sortField]: sortOrderNum })
        .skip(skip)
        .limit(limit)
        .populate("profileImage")
        .lean(),
      User.countDocuments(query),
    ]);

    const companiesWithCounts = await attachOpenJobsCount(companies);

    return {
      companies: companiesWithCounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 0,
    };
  },

  getCompanyById: async (id: string) => {
    const company = await User.findOne({ userId: id, role: USER_ROLES.COMPANY })
      .select("-password -email -savedJobs")
      .populate("profileImage")
      .lean();

    if (!company) return null;

    const [companyWithCount] = await attachOpenJobsCount([company]);

    const jobs = await Job.find({
      company: company._id,
      status: JobStatus.OPEN,
    })
      .populate({
        path: "company",
        select: "-password",
        populate: "profileImage",
      })
      .sort({ createdAt: -1 })
      .lean();

    return {
      company: companyWithCount,
      jobs,
    };
  },
};
