import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { IUserDocument } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { HttpError } from "@/lib/httpError";
import { mediaService } from "../media/media.services";
import { IMedia } from "@/types/media.types";
import { authService } from "../auth/auth.services";
import { mediaRepository } from "../media/media.repository";
import { IMediaDocument } from "@/models/media.model";
import { USER_ROLES } from "@/constants/roles";
import { formatZodErrorToRecord } from "@/lib/formatError";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "./user.validation";

export const userService = {
  updateProfile: async (data: {
    name?: string;
    password?: string;
    description?: string;
    location?: string;
    teamSizeMin?: number;
    teamSizeMax?: number;
  }) => {
    const result = updateProfileSchema.safeParse(data);
    if (!result.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(result.error) });
    }

    const user: IUserDocument = await authService.getUser();
    const {
      name,
      password,
      description,
      location,
      teamSizeMin,
      teamSizeMax,
    } = result.data;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw apiError(400, API_ERROR_CODES.INVALID_PASSWORD);
    }

    if (name) user.name = name;
    if (description) user.description = description;
    if (location) user.location = location;

    if (user.role === USER_ROLES.COMPANY) {
      if (teamSizeMin !== undefined || teamSizeMax !== undefined) {
        const min = teamSizeMin ?? user.teamSize?.min ?? 1;
        const max = teamSizeMax ?? user.teamSize?.max ?? 1;
        if (min > max) {
          throw apiError(400, API_ERROR_CODES.TEAM_SIZE_MIN_EXCEEDS_MAX);
        }
        user.teamSize = { min, max };
      }
    }

    await user.save();
    return { message: "Account updated successfully" };
  },

  changePassword: async (
    password: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) => {
    const result = changePasswordSchema.safeParse({
      password,
      newPassword,
      newPasswordConfirmation,
    });
    if (!result.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(result.error) });
    }

    const user: IUserDocument = await authService.getUser();
    const validated = result.data;

    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user.password
    );
    if (!isPasswordValid) {
      throw apiError(400, API_ERROR_CODES.INVALID_PASSWORD);
    }

    user.password = await bcrypt.hash(validated.newPassword, 10);
    await user.save();
    return { message: "Password changed successfully" };
  },

  updateProfileImage: async (profileImage: File) => {
    const user: IUserDocument = await authService.getUser();
    const oldProfileImage = user.profileImage;
    let existingMedia: IMedia | null = null;
    if (oldProfileImage) {
      existingMedia = await mediaRepository.findById(
        oldProfileImage._id.toString()
      );
      if (!existingMedia) {
        throw apiError(400, API_ERROR_CODES.PROFILE_IMAGE_NOT_FOUND);
      }
    }
    const media: IMediaDocument = await mediaService.createMedia(
      profileImage,
      "profile-images",
      1024 * 1024 * 5,
      ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    );
    user.profileImage = media;
    if (oldProfileImage && existingMedia) {
      await mediaService
        .deleteMedia(existingMedia)
        .catch((err) => console.error(err));
    }
    await user.save();
    return { message: "Profile image updated successfully" };
  },
};
