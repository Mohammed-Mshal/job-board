import bcrypt from "bcryptjs";
import { authRepository } from "./auth.repository";
import { USER_ROLES, UserRoleType } from "@/constants/roles";
import { loginValidation, registerValidation } from "./auth.validation";
import { formatZodError } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { mediaService } from "../media/media.services";
import { createSession, deleteSession, verifySession } from "@/lib/auth";
import { IUserDocument } from "@/models/user.model";
import { IMediaDocument } from "@/models/media.model";

export const authService = {
  login: async (email: string, password: string) => {
    const isValidData = loginValidation({ email, password });
    if (!isValidData.success) {
      throw new HttpError(400, { errors: formatZodError(isValidData.error) });
    }
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new HttpError(404, { error: "Account not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(400, { error: "Invalid password" });
    }
    await createSession({ userId: user._id.toString(), name: user.name, role: user.role });
    const { password:_password, ...publicUser } = user.toObject();
    return { message: "Account logged in successfully", user: publicUser };
  },

  register: async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    description: string,
    location: string,
    profileImage: File | null,
    role: UserRoleType
  ) => {
    const isValidData = registerValidation({ name, email, password, confirmPassword, role ,description,location});
    if (!isValidData.success) {
      throw new HttpError(400, { errors: formatZodError(isValidData.error) });
    }
    if (role !== USER_ROLES.USER && role !== USER_ROLES.COMPANY) {
      throw new HttpError(400, { error: "Invalid role" });
    }
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new HttpError(400, { error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let media : IMediaDocument | null = null;
    if (profileImage) {
      media = await mediaService.createMedia(profileImage);
    }
    const user = await authRepository.createUser(
      name,
      email,
      hashedPassword,
      description,
      location,
      role,
      media
    );
    if (!user) {
      throw new HttpError(500, { error: "Failed to create account" });
    }
    await createSession({ userId: user._id.toString(), name: user.name, role: user.role });
    return { message: "Account created successfully" };
  },

  logout: async () => {
    await deleteSession();
    return { message: "Logged out successfully" };
  },

  getUser: async (): Promise<IUserDocument> => {
    const isAccountLoggedIn = await verifySession();
    if (!isAccountLoggedIn) {
      throw new HttpError(401, { error: "Unauthorized" });
    }
    const user = await authRepository.findUserById(isAccountLoggedIn.userId);
    if (!user) {
      throw new HttpError(404, { error: "Account not found" });
    }
    return user;
  },

  getCompanyUser: async (): Promise<IUserDocument> => {
    const user = await authService.getUser();
    if (user.role !== USER_ROLES.COMPANY) {
      throw new HttpError(401, { error: "Unauthorized" });
    }
    return user;
  },
};
