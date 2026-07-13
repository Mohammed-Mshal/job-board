import { TESTIMONIAL_STATUS } from "@/types/testimonial.types";
import { z } from "zod";

export const submitTestimonialSchema = z.object({
  name: z.string().min(2, { message: "nameMin2" }),
  jobTitle: z.string().min(2, { message: "jobTitleMin2" }),
  testimonial: z
    .string()
    .min(20, { message: "reviewMin20" })
    .max(1000, { message: "reviewMax1000" }),
  rating: z.coerce.number().int().min(1).max(5),
});

export type SubmitTestimonialInput = z.infer<typeof submitTestimonialSchema>;

export const submitTestimonialValidation = (data: unknown) =>
  submitTestimonialSchema.safeParse(data);

export const updateTestimonialStatusSchema = z.object({
  status: z.enum([
    TESTIMONIAL_STATUS.PENDING,
    TESTIMONIAL_STATUS.APPROVED,
    TESTIMONIAL_STATUS.REJECTED,
  ]),
  adminMessage: z.string().min(5, { message: "messageMin5" }).max(2000, { message: "messageMax2000" }).optional(),
});

export const listAdminTestimonialsQuerySchema = z.object({
  status: z
    .enum([
      TESTIMONIAL_STATUS.PENDING,
      TESTIMONIAL_STATUS.APPROVED,
      TESTIMONIAL_STATUS.REJECTED,
      "all",
    ])
    .optional()
    .default("all"),
});

export const listAdminTestimonialsQueryValidation = (
  params: Record<string, string | undefined>
) => listAdminTestimonialsQuerySchema.safeParse(params);
