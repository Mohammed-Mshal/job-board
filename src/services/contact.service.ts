import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
}

export const contactService = {
  submitContact: async (payload: ContactPayload): Promise<ContactResponse> => {
    return api.post<ContactResponse>(ENDPOINTS.CONTACT.SUBMIT, payload);
  },
};
