import { API_ERROR_CODES, ApiErrorCode } from "./apiErrorCodes";
import { HttpError } from "./httpError";

export function apiError(
  status: number,
  code: ApiErrorCode | string,
  params?: Record<string, string | number>
): HttpError {
  return new HttpError(status, { code, params });
}

export { API_ERROR_CODES };
