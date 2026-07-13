import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { IUserMessage } from "@/types/user-message.types";

export interface UserMessagesResponse {
  messages: IUserMessage[];
  unreadCount: number;
}

export const userMessageService = {
  getMessages: async (): Promise<UserMessagesResponse> => {
    return api.get<UserMessagesResponse>(ENDPOINTS.PROFILE.MESSAGES);
  },

  markAsRead: async (id: string): Promise<{ message: string; userMessage: IUserMessage }> => {
    return api.patch(ENDPOINTS.PROFILE.MESSAGE(id), { read: true });
  },
};
