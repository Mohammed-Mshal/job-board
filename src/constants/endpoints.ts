const API_VERSION = "/api/v1";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    REGISTER: `${API_VERSION}/auth/signup`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    ME: `${API_VERSION}/auth/me`,
  },
  PROFILE: {
    GET: `${API_VERSION}/profile`,
    UPDATE: `${API_VERSION}/profile/edit-profile`,
    CHANGE_PASSWORD: `${API_VERSION}/profile/change-password`,
    UPLOAD_IMAGE: `${API_VERSION}/profile/update-image`,
  },
  COMPANY: {
    GET: `${API_VERSION}/auth/me`,
    UPDATE: `${API_VERSION}/profile/edit-profile`,
    UPLOAD_LOGO: `${API_VERSION}/profile/update-image`,
  },
  JOBS: {
    LIST: `${API_VERSION}/jobs`,
    BY_ID: (id: string) => `${API_VERSION}/jobs/${id}`,
    APPLICATIONS: (jobId: string) => `${API_VERSION}/jobs/${jobId}/applications`,
  },
  APPLICATIONS: {
    LIST: `${API_VERSION}/applications`,
    BY_ID: (id: string) => `${API_VERSION}/applications/${id}`,
    STATUS: (id: string) => `${API_VERSION}/applications/${id}`,
  },
} as const;
