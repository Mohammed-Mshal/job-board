export const TESTIMONIAL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type TestimonialStatus =
  (typeof TESTIMONIAL_STATUS)[keyof typeof TESTIMONIAL_STATUS];

export interface ITestimonial {
  _id: string;
  userId?: string;
  name: string;
  jobTitle: string;
  testimonial: string;
  image: string;
  rating: number;
  status: TestimonialStatus;
  createdAt: string;
  updatedAt: string;
}
