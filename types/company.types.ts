import { IMedia } from "./media.types";
import { IJob } from "./job.types";

export interface ICompany {
  _id: string;
  userId: string;
  name: string;
  description: string;
  location: string;
  teamSize?: {
    min: number;
    max: number;
  };
  profileImage: IMedia | null;
  openJobsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CompaniesListResponse {
  companies: ICompany[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CompanyDetailResponse {
  company: ICompany;
  jobs: IJob[];
}

export interface GetCompaniesParams {
  search?: string;
  location?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
