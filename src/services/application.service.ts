import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  Application,
  ApplicationStatusResponse,
  ApplicationStatusUpdateResponse,
  ApplyToJobPayload,
  ApplyToJobResponse,
} from "@/types/api.types";
import { ApplicationStatus } from "@/types/applications.types";

interface ApplyToJobOptions {
  onUploadProgress?: (progress: number) => void;
}

export const applicationService = {
  applyToJob: async (
    payload: ApplyToJobPayload,
    options?: ApplyToJobOptions
  ): Promise<ApplyToJobResponse> => {
    const formData = new FormData();
    formData.append("jobId", payload.jobId);
    formData.append("coverLetter", payload.coverLetter);
    formData.append("resume", payload.resume);

    return api.post<ApplyToJobResponse>(
      ENDPOINTS.APPLICATIONS.LIST,
      formData,
      {
        onUploadProgress: (event) => {
          if (!event.total) return;
          const progress = Math.round((event.loaded * 100) / event.total);
          options?.onUploadProgress?.(progress);
        },
      }
    );
  },

  getApplicationStatus: async (
    jobId: string
  ): Promise<ApplicationStatusResponse> => {
    return api.get<ApplicationStatusResponse>(
      ENDPOINTS.JOBS.APPLICATION_STATUS(jobId)
    );
  },

  getApplications: async (): Promise<Application[]> => {
    return api.get<Application[]>(ENDPOINTS.APPLICATIONS.LIST);
  },

  getApplicationsByJob: async (jobId: string): Promise<Application[]> => {
    return api.get<Application[]>(ENDPOINTS.JOBS.APPLICATIONS(jobId));
  },

  acceptApplication: async (
    id: string
  ): Promise<ApplicationStatusUpdateResponse> => {
    return api.patch<ApplicationStatusUpdateResponse>(
      ENDPOINTS.APPLICATIONS.STATUS(id),
      { status: ApplicationStatus.ACCEPTED }
    );
  },

  rejectApplication: async (
    id: string
  ): Promise<ApplicationStatusUpdateResponse> => {
    return api.patch<ApplicationStatusUpdateResponse>(
      ENDPOINTS.APPLICATIONS.STATUS(id),
      { status: ApplicationStatus.REJECTED }
    );
  },

  reviewApplication: async (
    id: string
  ): Promise<ApplicationStatusUpdateResponse> => {
    return api.patch<ApplicationStatusUpdateResponse>(
      ENDPOINTS.APPLICATIONS.STATUS(id),
      { status: ApplicationStatus.REVIEWING }
    );
  },

  updateApplicationStatus: async (
    id: string,
    status: ApplicationStatus
  ): Promise<ApplicationStatusUpdateResponse> => {
    return api.patch<ApplicationStatusUpdateResponse>(
      ENDPOINTS.APPLICATIONS.STATUS(id),
      { status }
    );
  },

  deleteApplication: async (id: string): Promise<{ message: string }> => {
    return api.delete<{ message: string }>(ENDPOINTS.APPLICATIONS.BY_ID(id));
  },
};
