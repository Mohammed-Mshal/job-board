import mongoose, { Schema } from "mongoose";
import { CmsLocale, LocaleCmsContent } from "@/types/cms.types";

export interface ISiteContentDocument extends mongoose.Document {
  slug: string;
  content: Record<CmsLocale, LocaleCmsContent>;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const localeContentSchema = new Schema(
  {
    general: { type: Schema.Types.Mixed, required: true },
    home: { type: Schema.Types.Mixed, required: true },
    about: { type: Schema.Types.Mixed, required: true },
    contact: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const siteContentSchema = new Schema<ISiteContentDocument>(
  {
    slug: { type: String, required: true, unique: true },
    content: {
      en: { type: localeContentSchema, required: true },
      ar: { type: localeContentSchema, required: true },
    },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

export const SiteContent =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContentDocument>("SiteContent", siteContentSchema);
