import { UserRoleType } from "@/constants/roles";
import { UserStatusType } from "@/constants/userStatus";
import { ApplicationStatusType } from "@/types/applications.types";
import { IJob, JobStatusType } from "@/types/job.types";
import { IMedia } from "@/types/media.types";

export interface PublicUser {
  _id: string;
  userId: string;
  name: string;
  email: string;
  description: string;
  location: string;
  profileImage: IMedia | null;
  role: UserRoleType;
  status: UserStatusType;
  teamSize?: {
    min: number;
    max: number;
  };
  savedJobs?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SaveJobResponse {
  saved: boolean;
  message: string;
}

export interface SaveJobStatusResponse {
  saved: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  description: string;
  location: string;
  role: UserRoleType;
  profileImage?: File | null;
}

export interface UpdateProfilePayload {
  name?: string;
  password: string;
  description?: string;
  location?: string;
  teamSizeMin?: number;
  teamSizeMax?: number;
}

export interface ChangePasswordPayload {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface UpdateCompanyPayload {
  name?: string;
  password: string;
  description?: string;
  location?: string;
  teamSizeMin?: number;
  teamSizeMax?: number;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  location: string;
  salary: {
    min: number;
    max: number;
  };
  requirements: string[];
  status?: JobStatusType;
}

export interface UpdateJobPayload extends Partial<CreateJobPayload> {
  salary?: {
    min: number;
    max: number;
  };
  requirements?: string[];
}

export interface GetJobsParams {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  status?: JobStatusType | null;
  location?: string;
  mine?: boolean;
  salary?: {
    min?: number | null;
    max?: number | null;
  };
  requirements?: string[] | null;
}

export interface SavedJobsResponse {
  jobs: IJob[];
}

export interface JobsListResponse {
  jobs: IJob[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Application {
  _id: string;
  job: IJob;
  user: PublicUser;
  status: ApplicationStatusType;
  coverLetter: string;
  resume: IMedia;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationStatusResponse {
  applied: boolean;
  isAuthenticated: boolean;
}

export interface ApplyToJobResponse {
  message: string;
  application: Application;
}

export interface ApplyToJobPayload {
  jobId: string;
  coverLetter: string;
  resume: File;
}

export interface UpdateApplicationStatusPayload {
  status: ApplicationStatusType;
}

export interface ApplicationStatusUpdateResponse {
  message: string;
  application: Application;
}

export interface AdminUsersListResponse {
  users: PublicUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminUserStats {
  total: number;
  jobSeekers: number;
  companies: number;
  admins: number;
  suspended: number;
}

export interface AdminUserUpdateResponse {
  message: string;
  user: PublicUser;
}

export interface GetAdminUsersParams {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}
