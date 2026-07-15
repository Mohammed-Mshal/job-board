import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  CreateJobPayload,
  GetJobsParams,
  JobsListResponse,
  SaveJobResponse,
  SaveJobStatusResponse,
  UpdateJobPayload,
} from "@/types/api.types";
import { ApiResponse, SuccessResponse } from "@/types/response.types";
import { IJob } from "@/types/job.types";
import axios from "axios";

export const jobService = {
  getJobs: async (params?: GetJobsParams): Promise<JobsListResponse> => {
    return await api.get<JobsListResponse>(ENDPOINTS.JOBS.LIST, { params });
  },

  getJob: async (id: string): Promise<IJob|null> => {
    try {
      return api.get<IJob>(ENDPOINTS.JOBS.BY_ID(id));
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  createJob: async (payload: CreateJobPayload): Promise<IJob> => {
    return api.post<IJob>(ENDPOINTS.JOBS.LIST, payload);
  },

  updateJob: async (
    id: string,
    payload: UpdateJobPayload
  ): Promise<ApiResponse<IJob>> => {
    return api.patch<ApiResponse<IJob>>(ENDPOINTS.JOBS.BY_ID(id), payload);
  },

  deleteJob: async (id: string): Promise<SuccessResponse> => {
    return api.delete<SuccessResponse>(ENDPOINTS.JOBS.BY_ID(id));
  },

  toggleSaveJob: async (id: string): Promise<SaveJobResponse> => {
    return api.post<SaveJobResponse>(ENDPOINTS.JOBS.SAVE(id));
  },

  getSaveStatus: async (id: string): Promise<SaveJobStatusResponse> => {
    return api.get<SaveJobStatusResponse>(ENDPOINTS.JOBS.SAVE(id));
  },
};
