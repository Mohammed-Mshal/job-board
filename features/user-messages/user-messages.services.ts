import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { authService } from "@/features/auth/auth.services";
import { formatZodErrorToRecord } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { userMessagesRepository } from "./user-messages.repository";
import {
  markMessageReadSchema,
  sendUserMessageValidation,
} from "./user-messages.validation";
import { User } from "@/models/user.model";

export const userMessagesService = {
  sendToUser: async (body: unknown) => {
    await authService.getAdminUser();

    const parsed = sendUserMessageValidation(body);
    if (!parsed.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(parsed.error) });
    }

    const recipient = await User.findOne({ userId: parsed.data.userId }).lean();
    if (!recipient) {
      throw apiError(404, API_ERROR_CODES.USER_NOT_FOUND);
    }

    const message = await userMessagesRepository.create({
      userId: parsed.data.userId,
      subject: parsed.data.subject,
      message: parsed.data.message,
      source: "admin",
    });

    return {
      message: "Message sent successfully",
      userMessage: message,
    };
  },

  sendToUserId: async (
    userId: string,
    subject: string,
    message: string,
    source: "admin" | "testimonial" | "general" = "admin",
    relatedId?: string
  ) => {
    return userMessagesRepository.create({
      userId,
      subject,
      message,
      source,
      relatedId,
    });
  },

  getMyMessages: async () => {
    const user = await authService.getUser();
    const messages = await userMessagesRepository.listByUserId(user.userId);
    const unreadCount = await userMessagesRepository.countUnread(user.userId);
    return { messages, unreadCount };
  },

  markAsRead: async (id: string, body: unknown) => {
    const user = await authService.getUser();
    const parsed = markMessageReadSchema.safeParse(body);
    if (!parsed.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(parsed.error) });
    }

    const message = await userMessagesRepository.markAsRead(id, user.userId);
    if (!message) {
      throw apiError(404, API_ERROR_CODES.MESSAGE_NOT_FOUND);
    }

    return {
      message: "Message marked as read",
      userMessage: message,
    };
  },
};
