import { UserMessage } from "@/models/user-message.model";
import { UserMessageSource } from "@/types/user-message.types";

function toUserMessage(doc: Record<string, unknown>) {
  return {
    _id: String(doc._id),
    userId: doc.userId as string,
    subject: doc.subject as string,
    message: doc.message as string,
    source: doc.source as UserMessageSource,
    relatedId: doc.relatedId as string | undefined,
    read: Boolean(doc.read),
    createdAt: (doc.createdAt as Date).toISOString(),
    updatedAt: (doc.updatedAt as Date).toISOString(),
  };
}

export const userMessagesRepository = {
  create: async (data: {
    userId: string;
    subject: string;
    message: string;
    source?: UserMessageSource;
    relatedId?: string;
  }) => {
    const item = await UserMessage.create(data);
    return toUserMessage(item.toObject() as unknown as Record<string, unknown>);
  },

  listByUserId: async (userId: string) => {
    const items = await UserMessage.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    return items.map((item) =>
      toUserMessage(item as unknown as Record<string, unknown>)
    );
  },

  markAsRead: async (id: string, userId: string) => {
    const item = await UserMessage.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true }
    ).lean();
    if (!item) return null;
    return toUserMessage(item as unknown as Record<string, unknown>);
  },

  countUnread: async (userId: string) => {
    return UserMessage.countDocuments({ userId, read: false });
  },
};
