import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  AdminUserStats,
  AdminUserUpdateResponse,
  AdminUsersListResponse,
  GetAdminUsersParams,
  PublicUser,
} from "@/types/api.types";
import {
  CmsLocale,
  CmsSection,
  ContactSubmission,
  ContactSubmissionStatus,
  LocaleCmsContent,
  SiteCmsDocument,
} from "@/types/cms.types";
import { UserRoleType } from "@/constants/roles";
import { UserStatusType } from "@/constants/userStatus";
import { ITestimonial, TestimonialStatus } from "@/types/testimonial.types";
import { IUserMessage } from "@/types/user-message.types";

export const cmsService = {
  getPublicContent: async (locale: CmsLocale): Promise<LocaleCmsContent> => {
    return api.get<LocaleCmsContent>(ENDPOINTS.CMS.PUBLIC, {
      params: { locale },
    });
  },
};

export const adminService = {
  getCmsContent: async (): Promise<SiteCmsDocument> => {
    return api.get<SiteCmsDocument>(ENDPOINTS.CMS.ADMIN);
  },

  updateCmsSection: async (
    locale: CmsLocale,
    section: CmsSection,
    data: unknown
  ): Promise<{ message: string; content: Record<CmsLocale, LocaleCmsContent> }> => {
    return api.put(ENDPOINTS.CMS.ADMIN, { locale, section, data });
  },

  getSubmissions: async (
    status?: ContactSubmissionStatus
  ): Promise<ContactSubmission[]> => {
    return api.get<ContactSubmission[]>(ENDPOINTS.CMS.SUBMISSIONS, {
      params: status ? { status } : undefined,
    });
  },

  updateSubmissionStatus: async (
    id: string,
    status: ContactSubmissionStatus
  ): Promise<{ message: string; submission: ContactSubmission }> => {
    return api.patch(ENDPOINTS.CMS.SUBMISSION(id), { status });
  },

  getUserStats: async (): Promise<AdminUserStats> => {
    return api.get<AdminUserStats>(ENDPOINTS.ADMIN.USER_STATS);
  },

  getUsers: async (params?: GetAdminUsersParams): Promise<AdminUsersListResponse> => {
    return api.get<AdminUsersListResponse>(ENDPOINTS.ADMIN.USERS, { params });
  },

  updateUser: async (
    userId: string,
    data: { role?: UserRoleType; status?: UserStatusType }
  ): Promise<AdminUserUpdateResponse> => {
    return api.patch<AdminUserUpdateResponse>(ENDPOINTS.ADMIN.USER(userId), data);
  },

  getTestimonials: async (
    status?: TestimonialStatus | "all"
  ): Promise<ITestimonial[]> => {
    return api.get<ITestimonial[]>(ENDPOINTS.TESTIMONIALS.ADMIN, {
      params: status ? { status } : undefined,
    });
  },

  updateTestimonialStatus: async (
    id: string,
    status: TestimonialStatus,
    adminMessage?: string
  ): Promise<{ message: string; testimonial: ITestimonial }> => {
    return api.patch(ENDPOINTS.TESTIMONIALS.ADMIN_ITEM(id), {
      status,
      ...(adminMessage ? { adminMessage } : {}),
    });
  },

  deleteTestimonial: async (id: string): Promise<{ message: string }> => {
    return api.delete(ENDPOINTS.TESTIMONIALS.ADMIN_ITEM(id));
  },

  sendUserMessage: async (data: {
    userId: string;
    subject: string;
    message: string;
  }): Promise<{ message: string; userMessage: IUserMessage }> => {
    return api.post(ENDPOINTS.ADMIN.USER_MESSAGES, data);
  },
};
