import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  PublicUser,
  UpdateCompanyPayload,
} from "@/types/api.types";
import {
  CompaniesListResponse,
  CompanyDetailResponse,
  GetCompaniesParams,
} from "@/types/company.types";
import { ApiResponse, SuccessResponse } from "@/types/response.types";
import axios from "axios";

export const companyService = {
  getCompanies: async (
    params?: GetCompaniesParams
  ): Promise<CompaniesListResponse> => {
    return api.get<CompaniesListResponse>(ENDPOINTS.COMPANY.LIST, { params });
  },

  getCompanyById: async (id: string): Promise<CompanyDetailResponse | null> => {
    try {
      return await api.get<CompanyDetailResponse>(ENDPOINTS.COMPANY.BY_ID(id));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getCompany: async (): Promise<ApiResponse<PublicUser>> => {
    return api.get<ApiResponse<PublicUser>>(ENDPOINTS.COMPANY.GET);
  },

  updateCompany: async (
    payload: UpdateCompanyPayload
  ): Promise<ApiResponse<SuccessResponse>> => {
    return api.patch<ApiResponse<SuccessResponse>>(
      ENDPOINTS.COMPANY.UPDATE,
      payload
    );
  },

  uploadCompanyLogo: async (
    logo: File
  ): Promise<ApiResponse<SuccessResponse>> => {
    const formData = new FormData();
    formData.append("profileImage", logo);

    return api.post<ApiResponse<SuccessResponse>>(
      ENDPOINTS.COMPANY.UPLOAD_LOGO,
      formData
    );
  },
};
