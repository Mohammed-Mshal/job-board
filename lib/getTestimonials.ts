import connectDB from "@/lib/db";
import { testimonialsService } from "@/features/testimonials/testimonials.services";

export async function getApprovedTestimonials() {
  await connectDB();
  return testimonialsService.getApproved();
}
