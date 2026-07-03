export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  error?: string;
  errors?: Record<string, string[]> | Array<{ field: string; message: string }>;
  message?: string;
}

export interface SuccessResponse {
  message: string;
}

export interface ValidationErrorResponse {
  errors: Record<string, string[]>;
}
