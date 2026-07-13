import { TESTIMONIAL_STATUS, TestimonialStatus } from "@/types/testimonial.types";
import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonialDocument extends Document {
  userId?: string;
  name: string;
  jobTitle: string;
  testimonial: string;
  image: string;
  rating: number;
  status: TestimonialStatus;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonialDocument>(
  {
    userId: { type: String, index: true },
    name: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    testimonial: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: {
      type: String,
      enum: Object.values(TESTIMONIAL_STATUS),
      default: TESTIMONIAL_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Testimonial) {
  delete mongoose.models.Testimonial;
}

export const Testimonial = mongoose.model<ITestimonialDocument>(
  "Testimonial",
  testimonialSchema
);
