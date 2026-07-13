import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { authService } from "@/features/auth/auth.services";
import { formatZodErrorToRecord } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { getUserAvatarUrl } from "@/lib/getUserAvatarUrl";
import { IMedia } from "@/types/media.types";
import { TestimonialStatus } from "@/types/testimonial.types";
import { IUserDocument } from "@/models/user.model";
import { testimonialsRepository } from "./testimonials.repository";
import { userMessagesService } from "../user-messages/user-messages.services";
import {
  listAdminTestimonialsQueryValidation,
  submitTestimonialValidation,
  updateTestimonialStatusSchema,
} from "./testimonials.validation";

function resolveUserImage(user: IUserDocument) {
  const profileImage = user.profileImage as IMedia | null;
  return getUserAvatarUrl(user.name, profileImage?.url);
}

export const testimonialsService = {
  getApproved: async () => {
    return testimonialsRepository.getApproved();
  },

  submit: async (body: unknown) => {
    const user = await authService.getUser();

    const parsed = submitTestimonialValidation(body);
    if (!parsed.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(parsed.error) });
    }

    const testimonial = await testimonialsRepository.create({
      ...parsed.data,
      image: resolveUserImage(user),
      userId: user.userId,
    });

    return {
      message: "Thank you! Your review has been submitted and is pending approval.",
      testimonial,
    };
  },

  listAdmin: async (params: Record<string, string | undefined>) => {
    await authService.getAdminUser();

    const parsed = listAdminTestimonialsQueryValidation(params);
    if (!parsed.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(parsed.error) });
    }

    return testimonialsRepository.listAll(parsed.data.status);
  },

  updateStatus: async (id: string, body: unknown) => {
    await authService.getAdminUser();

    const parsed = updateTestimonialStatusSchema.safeParse(body);
    if (!parsed.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(parsed.error) });
    }

    const existing = await testimonialsRepository.getById(id);
    if (!existing) {
      throw apiError(404, API_ERROR_CODES.TESTIMONIAL_NOT_FOUND);
    }

    const testimonial = await testimonialsRepository.updateStatus(
      id,
      parsed.data.status as TestimonialStatus
    );

    if (!testimonial) {
      throw apiError(404, API_ERROR_CODES.TESTIMONIAL_NOT_FOUND);
    }

    if (parsed.data.adminMessage?.trim() && existing.userId) {
      const subject =
        parsed.data.status === "approved"
          ? "Your review was approved"
          : parsed.data.status === "rejected"
            ? "Your review was not approved"
            : "Update on your review";

      await userMessagesService.sendToUserId(
        existing.userId,
        subject,
        parsed.data.adminMessage.trim(),
        "testimonial",
        id
      );
    }

    return {
      message: parsed.data.adminMessage?.trim()
        ? "Testimonial updated and message sent to user"
        : "Testimonial updated successfully",
      testimonial,
    };
  },

  delete: async (id: string) => {
    await authService.getAdminUser();

    const deleted = await testimonialsRepository.deleteById(id);
    if (!deleted) {
      throw apiError(404, API_ERROR_CODES.TESTIMONIAL_NOT_FOUND);
    }

    return { message: "Testimonial deleted successfully" };
  },
};
