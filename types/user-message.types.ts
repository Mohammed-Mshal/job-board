export type UserMessageSource = "admin" | "testimonial" | "general";

export interface IUserMessage {
  _id: string;
  userId: string;
  subject: string;
  message: string;
  source: UserMessageSource;
  relatedId?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
