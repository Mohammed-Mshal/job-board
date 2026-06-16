import { IUserDocument } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { HttpError } from "@/lib/httpError";
import { mediaService } from "../media/media.services";
import { IMedia } from "@/types/media.types";
import { authService } from "../auth/auth.services";
import { mediaRepository } from "../media/media.repository";
import { IMediaDocument } from "@/models/media.model";

export const userService = {
  updateProfile: async (data: {
    name?: string;
    password?: string;
    description?: string;
    location?: string;
  }) => {
    const user: IUserDocument = await authService.getUser();
    const { name, password, description, location } = data;

    if (!password) {
      throw new HttpError(400, { error: "Current password is required" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(400, { error: "Invalid password" });
    }
    if (name) {
      user.name = name;
    }
    if (description) {
      user.description = description;
    }
    if (location) {
      user.location = location;
    }
    await user.save();
    return { message: "Account updated successfully" };
  },

  changePassword: async (
    password: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) => {
    const user: IUserDocument = await authService.getUser();

    if (!password) {
      throw new HttpError(400, { error: "Current password is required" });
    }
    if (!newPassword || !newPasswordConfirmation) {
      throw new HttpError(400, { error: "New password and confirmation are required" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(400, { error: "Invalid password" });
    }
    if (newPassword !== newPasswordConfirmation) {
      throw new HttpError(400, { error: "New password and new password confirmation do not match" });
    }
    if (newPassword === password) {
      throw new HttpError(400, { error: "New password cannot be the same as the old password" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return { message: "Password changed successfully" };
  },

  updateProfileImage: async (profileImage: File) => {
    const user: IUserDocument = await authService.getUser();
    const oldProfileImage = user.profileImage;
    let existingMedia: IMedia | null = null;
    if (oldProfileImage) {
        existingMedia = await mediaRepository.findById(oldProfileImage._id.toString());
        if (!existingMedia) {
          throw new HttpError(400, { error: "Profile image not found" });
        }
    }
    const media: IMediaDocument = await mediaService.createMedia(profileImage,'profile-images', 1024 * 1024 * 5, ["image/jpeg", "image/png", "image/webp","image/jpg"]);
    user.profileImage = media;
    if (oldProfileImage &&existingMedia) {
      await mediaService.deleteMedia(existingMedia).catch((err) => console.error(err));
    }
    await user.save();
    return { message: "Profile image updated successfully" };
  },
};
