import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  ChangePasswordPayload,
  PublicUser,
  SavedJobsResponse,
  UpdateProfilePayload,
} from "@/types/api.types";
import { ApiResponse, SuccessResponse } from "@/types/response.types";

export const userService = {
  getProfile: async (): Promise<PublicUser> => {
    return api.get<PublicUser>(ENDPOINTS.PROFILE.GET);
  },

  updateProfile: async (
    payload: UpdateProfilePayload
  ): Promise<ApiResponse<SuccessResponse>> => {
    return api.patch<ApiResponse<SuccessResponse>>(ENDPOINTS.PROFILE.UPDATE, payload);
  },

  changePassword: async (
    payload: ChangePasswordPayload
  ): Promise<ApiResponse<SuccessResponse>> => {
    return api.patch<ApiResponse<SuccessResponse>>(
      ENDPOINTS.PROFILE.CHANGE_PASSWORD,
      payload
    );
  },

  uploadProfileImage: async (profileImage: File): Promise<ApiResponse<SuccessResponse>> => {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    return api.patch<ApiResponse<SuccessResponse>>(ENDPOINTS.PROFILE.UPLOAD_IMAGE, formData);
  },

  getSavedJobs: async (): Promise<SavedJobsResponse> => {
    return api.get<SavedJobsResponse>(ENDPOINTS.PROFILE.SAVED_JOBS);
  },
};
