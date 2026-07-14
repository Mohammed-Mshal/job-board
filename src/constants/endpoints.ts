const API_VERSION = "/api/v1";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    REGISTER: `${API_VERSION}/auth/signup`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    REFRESH: `${API_VERSION}/auth/refresh`,
    CSRF: `${API_VERSION}/csrf`,
  },
  PROFILE: {
    GET: `${API_VERSION}/profile`,
    UPDATE: `${API_VERSION}/profile/edit-profile`,
    CHANGE_PASSWORD: `${API_VERSION}/profile/change-password`,
    UPLOAD_IMAGE: `${API_VERSION}/profile/update-image`,
    SAVED_JOBS: `${API_VERSION}/profile/saved-jobs`,
    MESSAGES: `${API_VERSION}/profile/messages`,
    MESSAGE: (id: string) => `${API_VERSION}/profile/messages/${id}`,
  },
  COMPANY: {
    GET: `${API_VERSION}/profile`,
    UPDATE: `${API_VERSION}/profile/edit-profile`,
    UPLOAD_LOGO: `${API_VERSION}/profile/update-image`,
    LIST: `${API_VERSION}/companies`,
    BY_ID: (id: string) => `${API_VERSION}/companies/${id}`,
  },
  JOBS: {
    LIST: `${API_VERSION}/jobs`,
    BY_ID: (id: string) => `${API_VERSION}/jobs/${id}`,
    APPLICATIONS: (jobId: string) => `${API_VERSION}/jobs/${jobId}/applications`,
    APPLICATION_STATUS: (id: string) => `${API_VERSION}/jobs/${id}/application`,
    SAVE: (id: string) => `${API_VERSION}/jobs/${id}/save`,
  },
  APPLICATIONS: {
    LIST: `${API_VERSION}/applications`,
    BY_ID: (id: string) => `${API_VERSION}/applications/${id}`,
    STATUS: (id: string) => `${API_VERSION}/applications/${id}`,
  },
  CONTACT: {
    SUBMIT: `${API_VERSION}/contact`,
  },
  TESTIMONIALS: {
    LIST: `${API_VERSION}/testimonials`,
    SUBMIT: `${API_VERSION}/testimonials`,
    ADMIN: `${API_VERSION}/admin/testimonials`,
    ADMIN_ITEM: (id: string) => `${API_VERSION}/admin/testimonials/${id}`,
  },
  CMS: {
    PUBLIC: `${API_VERSION}/cms`,
    ADMIN: `${API_VERSION}/admin/cms`,
    SUBMISSIONS: `${API_VERSION}/admin/contact-submissions`,
    SUBMISSION: (id: string) => `${API_VERSION}/admin/contact-submissions/${id}`,
  },
  ADMIN: {
    USERS: `${API_VERSION}/admin/users`,
    USER: (userId: string) => `${API_VERSION}/admin/users/${userId}`,
    USER_STATS: `${API_VERSION}/admin/users/stats`,
    USER_MESSAGES: `${API_VERSION}/admin/user-messages`,
  },
} as const;
