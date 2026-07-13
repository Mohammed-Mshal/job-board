import mongoose, { Schema } from "mongoose";
import { ContactSubmissionStatus } from "@/types/cms.types";

export interface IContactSubmissionDocument extends mongoose.Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactSubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmissionDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmissionDocument>(
    "ContactSubmission",
    contactSubmissionSchema
  );
