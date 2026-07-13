import { Testimonial } from "@/models/testimonial.model";
import { TESTIMONIAL_STATUS, TestimonialStatus } from "@/types/testimonial.types";
import { SubmitTestimonialInput } from "./testimonials.validation";

function toTestimonial(doc: Record<string, unknown>) {
  return {
    _id: String(doc._id),
    userId: doc.userId as string | undefined,
    name: doc.name as string,
    jobTitle: doc.jobTitle as string,
    testimonial: doc.testimonial as string,
    image: (doc.image as string) || "",
    rating: doc.rating as number,
    status: doc.status as TestimonialStatus,
    createdAt: (doc.createdAt as Date).toISOString(),
    updatedAt: (doc.updatedAt as Date).toISOString(),
  };
}

export const testimonialsRepository = {
  getApproved: async () => {
    const items = await Testimonial.find({ status: TESTIMONIAL_STATUS.APPROVED })
      .sort({ createdAt: -1 })
      .lean();

    return items.map((item) => toTestimonial(item as unknown as Record<string, unknown>));
  },

  getById: async (id: string) => {
    const item = await Testimonial.findById(id).lean();
    if (!item) return null;
    return toTestimonial(item as unknown as Record<string, unknown>);
  },

  create: async (data: SubmitTestimonialInput & { image: string; userId: string }) => {
    const item = await Testimonial.create({
      userId: data.userId,
      name: data.name,
      jobTitle: data.jobTitle,
      testimonial: data.testimonial,
      rating: data.rating,
      image: data.image,
      status: TESTIMONIAL_STATUS.PENDING,
    });

    return toTestimonial(item.toObject() as unknown as Record<string, unknown>);
  },

  listAll: async (status?: TestimonialStatus | "all") => {
    const filter =
      status && status !== "all" ? { status } : {};

    const items = await Testimonial.find(filter).sort({ createdAt: -1 }).lean();

    return items.map((item) => toTestimonial(item as unknown as Record<string, unknown>));
  },

  updateStatus: async (id: string, status: TestimonialStatus) => {
    const item = await Testimonial.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!item) return null;
    return toTestimonial(item as unknown as Record<string, unknown>);
  },

  deleteById: async (id: string) => {
    return Testimonial.findByIdAndDelete(id);
  },
};
