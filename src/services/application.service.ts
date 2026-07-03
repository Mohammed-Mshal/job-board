import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  Application,
  ApplicationStatusUpdateResponse,
  ApplyToJobPayload,
} from "@/types/api.types";
import { ApplicationStatus } from "@/types/applications.types";
import { ApiResponse } from "@/types/response.types";

export const applicationService = {
  applyToJob: async (payload: ApplyToJobPayload): Promise<ApiResponse<Application>> => {
    const formData = new FormData();
    formData.append("jobId", payload.jobId);
    formData.append("coverLetter", payload.coverLetter);
    formData.append("resume", payload.resume);

    return api.post<ApiResponse<Application>>(ENDPOINTS.APPLICATIONS.LIST, formData);
  },

  getApplications: async (): Promise<ApiResponse<Application[]>> => {
    return api.get<ApiResponse<Application[]>>(ENDPOINTS.APPLICATIONS.LIST);
  },

  getApplicationsByJob: async (jobId: string): Promise<ApiResponse<Application[]>> => {
    return api.get<ApiResponse<Application[]>>(ENDPOINTS.JOBS.APPLICATIONS(jobId));
  },

  acceptApplication: async (
    id: string
  ): Promise<ApiResponse<ApplicationStatusUpdateResponse>> => {
    return api.patch<ApiResponse<ApplicationStatusUpdateResponse>>(
      ENDPOINTS.APPLICATIONS.STATUS(id),
      { status: ApplicationStatus.ACCEPTED }
    );
  },

  rejectApplication: async (
    id: string
  ): Promise<ApiResponse<ApplicationStatusUpdateResponse>> => {
    return api.patch<ApiResponse<ApplicationStatusUpdateResponse>>(
      ENDPOINTS.APPLICATIONS.STATUS(id),
      { status: ApplicationStatus.REJECTED }
    );
  },
};
