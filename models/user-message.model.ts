import { UserMessageSource } from "@/types/user-message.types";
import mongoose, { Document, Schema } from "mongoose";

export interface IUserMessageDocument extends Document {
  userId: string;
  subject: string;
  message: string;
  source: UserMessageSource;
  relatedId?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userMessageSchema = new Schema<IUserMessageDocument>(
  {
    userId: { type: String, required: true, index: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    source: {
      type: String,
      enum: ["admin", "testimonial", "general"],
      default: "admin",
    },
    relatedId: { type: String, default: undefined },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

if (mongoose.models.UserMessage) {
  delete mongoose.models.UserMessage;
}

export const UserMessage = mongoose.model<IUserMessageDocument>(
  "UserMessage",
  userMessageSchema
);
