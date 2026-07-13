import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { formatZodErrorToRecord } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { companiesRepository } from "./companies.repository";
import {
  buildCompaniesFilter,
  getCompaniesQueryValidation,
} from "./companies.validation";

export const companiesService = {
  getCompanies: async (searchParams: URLSearchParams) => {
    const params = Object.fromEntries(searchParams.entries());
    const result = getCompaniesQueryValidation(params);

    if (!result.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(result.error) });
    }

    const data = result.data;
    const filter = buildCompaniesFilter(data);

    return await companiesRepository.getCompanies(
      data.search,
      data.sortBy,
      data.sortOrder,
      filter,
      data.page,
      data.limit
    );
  },

  getCompanyById: async (id: string) => {
    const company = await companiesRepository.getCompanyById(id);
    if (!company) {
      throw apiError(404, API_ERROR_CODES.COMPANY_NOT_FOUND);
    }
    return company;
  },
};
