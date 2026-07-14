import mongoose, { Schema } from "mongoose";

export interface IRateLimitDocument {
  key: string;
  count: number;
  expiresAt: Date;
}

const rateLimitSchema = new Schema<IRateLimitDocument>({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
});

export const RateLimit =
  mongoose.models.RateLimit ||
  mongoose.model<IRateLimitDocument>("RateLimit", rateLimitSchema);
