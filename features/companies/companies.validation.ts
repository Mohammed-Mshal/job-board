import { escapeRegex } from "@/lib/escapeRegex";
import { z } from "zod";
import type { QueryFilter } from "mongoose";
import { IUserDocument } from "@/models/user.model";

export const COMPANY_SORT_BY_VALUES = ["createdAt", "name"] as const;

const getCompaniesQuerySchema = z.object({
  search: z.string().max(200).optional().default(""),
  sortBy: z.enum(COMPANY_SORT_BY_VALUES).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  location: z.string().max(200).optional(),
});

export type GetCompaniesQuery = z.infer<typeof getCompaniesQuerySchema>;

export const getCompaniesQueryValidation = (
  params: Record<string, string | undefined>
) => getCompaniesQuerySchema.safeParse(params);

export function buildCompaniesFilter(
  data: GetCompaniesQuery
): QueryFilter<IUserDocument> {
  const filter: QueryFilter<IUserDocument> = {};

  if (data.location) {
    filter.location = { $regex: escapeRegex(data.location), $options: "i" };
  }

  return filter;
}
