import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type UnauthorizedHandler = () => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  unauthorizedHandler = handler;
}

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "";
  }

  return (
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.API_URL ??
    "http://localhost:3000"
  );
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30_000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.data instanceof FormData) {
      config.headers.set("Content-Type", undefined) 
    }

    return config;
  },
  (error: unknown) => Promise.reject(error)

);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    // Axios errors can take multiple shapes, so normalize them
    let status: number | undefined;
    if (axios.isAxiosError(error)) {
      status = error.response?.status;
    }

    // Handle 401 Unauthorized globally
    if (status === 401 && unauthorizedHandler) {
      unauthorizedHandler();
    }

    // Re-throw the error for further handling
    return Promise.reject(error);
  }
);

export interface TypedAxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

async function request<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axiosInstance.request<T>({
    method,
    url,
    data,
    ...config,
  });

  return response.data;
}

export const api: TypedAxiosInstance = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("get", url, undefined, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("post", url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("put", url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("patch", url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("delete", url, undefined, config),
};

export default axiosInstance;
