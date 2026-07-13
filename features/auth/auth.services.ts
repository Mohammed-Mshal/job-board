import bcrypt from "bcryptjs";
import { authRepository } from "./auth.repository";
import { USER_ROLES, UserRoleType } from "@/constants/roles";
import { loginValidation, registerValidation } from "./auth.validation";
import { formatZodError } from "@/lib/formatError";
import { apiError, API_ERROR_CODES } from "@/lib/apiError";
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
      throw apiError(404, API_ERROR_CODES.ACCOUNT_NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw apiError(400, API_ERROR_CODES.INVALID_PASSWORD);
    }
    if ((user.status ?? "active") === "suspended") {
      throw apiError(403, API_ERROR_CODES.ACCOUNT_SUSPENDED);
    }
    await createSession({ userId: user.userId.toString(), name: user.name, role: user.role });
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
    teamSize: {
      min: number;
      max: number;
    },
    profileImage: File | null,
    role: UserRoleType
  ) => {
    const isValidData = registerValidation({ name, email, password, confirmPassword, role ,description,location,teamSize});
    if (!isValidData.success) {
      throw new HttpError(400, { errors: formatZodError(isValidData.error) });
    }
    if (role !== USER_ROLES.USER && role !== USER_ROLES.COMPANY) {
      throw apiError(400, API_ERROR_CODES.INVALID_ROLE);
    }
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      throw apiError(400, API_ERROR_CODES.EMAIL_ALREADY_IN_USE);
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
      media,
      teamSize
    );
    if (!user) {
      throw apiError(500, API_ERROR_CODES.FAILED_TO_CREATE_ACCOUNT);
    }
    await createSession({ userId: user.userId.toString(), name: user.name, role: user.role });
    return { message: "Account created successfully" };
  },

  logout: async () => {
    await deleteSession();
    return { message: "Logged out successfully" };
  },

  getUser: async (): Promise<IUserDocument> => {
    const isAccountLoggedIn = await verifySession();
    if (!isAccountLoggedIn) {
      throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
    }
    const user = await authRepository.findUserById(isAccountLoggedIn.userId);
    if (!user) {
      throw apiError(404, API_ERROR_CODES.ACCOUNT_NOT_FOUND);
    }
    return user;
  },

  getCompanyUser: async (): Promise<IUserDocument> => {
    const user = await authService.getUser();
    if (user.role !== USER_ROLES.COMPANY) {
      throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
    }
    return user;
  },

  getAdminUser: async (): Promise<IUserDocument> => {
    const user = await authService.getUser();
    if (user.role !== USER_ROLES.ADMIN) {
      throw apiError(403, API_ERROR_CODES.ADMIN_ACCESS_REQUIRED);
    }
    return user;
  },
};
