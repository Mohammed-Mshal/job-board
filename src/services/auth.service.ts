import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  LoginCredentials,
  RegisterCredentials,
} from "@/types/api.types";
import { AxiosResponse } from "axios";

function buildRegisterFormData(credentials: RegisterCredentials): FormData {
  const formData = new FormData();
  formData.append("name", credentials.name);
  formData.append("email", credentials.email);
  formData.append("password", credentials.password);
  formData.append("confirmPassword", credentials.confirmPassword);
  formData.append("description", credentials.description);
  formData.append("location", credentials.location);
  formData.append("role", credentials.role);

  if (credentials.profileImage) {
    formData.append("profileImage", credentials.profileImage);
  }

  return formData;
}

export const authService = {
  login: async <T>(credentials: LoginCredentials): Promise<T>  => {
    return await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (credentials: RegisterCredentials)=> {
    const formData = buildRegisterFormData(credentials);
    return await api.post(ENDPOINTS.AUTH.REGISTER, formData);
  },

  logout: async () => {
    return await api.post(ENDPOINTS.AUTH.LOGOUT);
  },

  me: async <T>(): Promise<T> => {
    return await api.get<T>(ENDPOINTS.AUTH.ME);
  },
};
