import {
  CompaniesListResponse,
  GetCompaniesParams,
  ICompany,
} from "@/types/company.types";
import { AxiosError } from "axios";
import { create } from "zustand";
import { companyService } from "../services/company.service";

interface CompaniesStore {
  companies: ICompany[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  search: string | null;
  location: string | null;
  sortBy: GetCompaniesParams["sortBy"] | null;
  sortOrder: "asc" | "desc" | null;
  fetchCompanies: () => Promise<void>;
  setSearch: (search: string) => void;
  setLocation: (location: string) => void;
  setPage: (page: number) => void;
}

export const useCompaniesStore = create<CompaniesStore>((set, get) => ({
  companies: [],
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 0,
  loading: false,
  error: null,
  search: null,
  location: null,
  sortBy: "createdAt",
  sortOrder: "desc",

  fetchCompanies: async () => {
    set({ loading: true, error: null });
    try {
      const response: CompaniesListResponse = await companyService.getCompanies({
        page: get().page,
        limit: get().limit,
        sortBy: get().sortBy ?? undefined,
        sortOrder: get().sortOrder ?? undefined,
        search: get().search ?? undefined,
        location: get().location ?? undefined,
      });
      set({
        companies: response.companies,
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
      });
    } catch (error) {
      set({
        error:
          error instanceof AxiosError
            ? ((error.response?.data?.error as string) ??
              "An unexpected error occurred")
            : "An unexpected error occurred",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setSearch: (search) => set({ search, page: 1 }),
  setLocation: (location) => set({ location, page: 1 }),
  setPage: (page) => set({ page }),
}));
