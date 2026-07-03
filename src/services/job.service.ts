import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  CreateJobPayload,
  GetJobsParams,
  JobsListResponse,
  UpdateJobPayload,
} from "@/types/api.types";
import { ApiResponse, SuccessResponse } from "@/types/response.types";
import { IJob } from "@/types/job.types";

export const jobService = {
  getJobs: async (params?: GetJobsParams): Promise<JobsListResponse> => {
    return await api.get<JobsListResponse>(ENDPOINTS.JOBS.LIST, { params });
  },

  getJob: async (id: string): Promise<ApiResponse<IJob>> => {
    return api.get<ApiResponse<IJob>>(ENDPOINTS.JOBS.BY_ID(id));
  },

  createJob: async (payload: CreateJobPayload): Promise<ApiResponse<IJob>> => {
    return api.post<ApiResponse<IJob>>(ENDPOINTS.JOBS.LIST, payload);
  },

  updateJob: async (
    id: string,
    payload: UpdateJobPayload
  ): Promise<ApiResponse<IJob>> => {
    return api.patch<ApiResponse<IJob>>(ENDPOINTS.JOBS.BY_ID(id), payload);
  },

  deleteJob: async (id: string): Promise<ApiResponse<SuccessResponse>> => {
    return api.delete<ApiResponse<SuccessResponse>>(ENDPOINTS.JOBS.BY_ID(id));
  },
};
