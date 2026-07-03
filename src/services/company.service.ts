import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  PublicUser,
  UpdateCompanyPayload,
} from "@/types/api.types";
import { ApiResponse, SuccessResponse } from "@/types/response.types";

export const companyService = {
  getCompany: async (): Promise<ApiResponse<PublicUser>> => {
    return api.get<ApiResponse<PublicUser>>(ENDPOINTS.COMPANY.GET);
  },

  updateCompany: async (
    payload: UpdateCompanyPayload
  ): Promise<ApiResponse<SuccessResponse>> => {
    return api.patch<ApiResponse<SuccessResponse>>(ENDPOINTS.COMPANY.UPDATE, payload);
  },

  uploadCompanyLogo: async (logo: File): Promise<ApiResponse<SuccessResponse>> => {
    const formData = new FormData();
    formData.append("profileImage", logo);

    return api.post<ApiResponse<SuccessResponse>>(ENDPOINTS.COMPANY.UPLOAD_LOGO, formData);
  },
};
