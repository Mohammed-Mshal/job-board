import { IJob, JobStatusType } from "@/types/job.types";
import  { AxiosError } from "axios";
import { create } from "zustand";
import { jobService } from "../services";

interface JobsStore {
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
  search: string | null;
  location: string | null;
  status: JobStatusType | null;
  requirements: string[] | null;
  salary: {
    min: number | null;
    max: number | null;
    currency: string | null;
    salaryPeriod: "year" | "month" | null;
  };
  fetchJobs: () => void;
  reset: () => void;
  setSearch: (search: string) => void;
  setLocation: (location: string) => void;
  setStatus: (status: JobStatusType | null) => void;
  setRequirements: (requirements: string[] | null) => void;
  setSalary: (salary: { min: number | null; max: number | null;currency: string | null; salaryPeriod: "month" | "year" | null  }) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: string | null) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc' | null) => void;
  clearFilters: () => void;
  filterState:boolean;
  toggleFilterState:()=>void
}

export const useJobsStore = create<JobsStore>((set,get) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  sortBy: null,
  sortOrder: 'asc',
  search: null,
  location: null,
  status: null,
  requirements: null,
  salary: { min: null, max: null, currency: null, salaryPeriod: null },
  
  fetchJobs: async () => {
    set({ loading: true });
    try {
      const response = await jobService.getJobs({
        page:get().page,
        limit:get().limit,
        sortBy:get().sortBy ?? undefined,
        sortOrder:get().sortOrder ?? undefined,
        search:get().search ?? undefined,
        location:get().location ?? undefined,
        status:get().status ?? undefined,
        requirements:get().requirements ?? undefined,
        salary:get().salary ?? undefined,
      });      
      set({ jobs: response.jobs, total: response.total, page: response.page, limit: response.limit, totalPages: response.totalPages });
    } catch (error) {
      set({ error: error instanceof AxiosError ? error.response?.data.error ?? "An unexpected error occurred" : "An unexpected error occurred" });
      throw error;
    }finally{
      set({ loading: false });
    }
  },
  reset: () => {
    set({ 
      jobs: [], 
      total: 0, 
      page: 1, 
      limit: 10, 
      totalPages: 0, 
      error: null, 
      loading: false, 
      search: null, 
      location: null, 
      status: null, 
      requirements: null, 
      salary: { min: null, max: null, currency: null, salaryPeriod: null } 
    });
    void get().fetchJobs();
  },
  setSearch: (search: string) => set({ search }),
  setLocation: (location: string) => set({ location }),
  setStatus: (status: JobStatusType | null) => set({ status }),
  setRequirements: (requirements: string[] | null) => set({ requirements }),
  setSalary: (salary: { min: number | null; max: number | null; currency: string | null; salaryPeriod: "month" | "year" | null }) => set({ salary: { ...salary } }),
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
  setSortBy: (sortBy: string | null) => set({ sortBy }),
  setSortOrder: (sortOrder: 'asc' | 'desc' | null) => set({ sortOrder }),
  clearFilters: () => {
    set({
      status: null,
      requirements: null,
      salary: { min: null, max: null, currency: null, salaryPeriod: null },
      sortBy: null,
      sortOrder: 'desc',
      page: 1,
    })
  },
  filterState:false,
  toggleFilterState:()=>{
    set({filterState:!get().filterState})
  },
}));