import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { authService } from "@/features/auth/auth.services";
import { formatZodError } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { USER_ROLES } from "@/constants/roles";
import { USER_STATUS } from "@/constants/userStatus";
import { adminUsersRepository } from "./admin-users.repository";
import {
  listAdminUsersQueryValidation,
  updateAdminUserValidation,
} from "./admin-users.validation";

export const adminUsersService = {
  listUsers: async (params: Record<string, string | undefined>) => {
    await authService.getAdminUser();

    const parsed = listAdminUsersQueryValidation(params);
    if (!parsed.success) {
      throw new HttpError(400, { errors: formatZodError(parsed.error) });
    }

    return adminUsersRepository.listUsers(parsed.data);
  },

  getStats: async () => {
    await authService.getAdminUser();
    return adminUsersRepository.getStats();
  },

  updateUser: async (
    targetUserId: string,
    body: unknown
  ) => {
    const admin = await authService.getAdminUser();

    const parsed = updateAdminUserValidation(body);
    if (!parsed.success) {
      throw new HttpError(400, { errors: formatZodError(parsed.error) });
    }

    const existing = await adminUsersRepository.getUserByUserId(targetUserId);
    if (!existing) {
      throw apiError(404, API_ERROR_CODES.USER_NOT_FOUND);
    }

    const updates = parsed.data;
    const isSelf = admin.userId === targetUserId;
    const { role: nextRole, status: nextStatus } = updates;

    if (isSelf && nextRole && nextRole !== USER_ROLES.ADMIN) {
      throw apiError(400, API_ERROR_CODES.CANNOT_CHANGE_OWN_ADMIN_ROLE);
    }

    if (isSelf && nextStatus === USER_STATUS.SUSPENDED) {
      throw apiError(400, API_ERROR_CODES.CANNOT_SUSPEND_OWN_ACCOUNT);
    }

    if (
      existing.role === USER_ROLES.ADMIN &&
      nextRole &&
      nextRole !== USER_ROLES.ADMIN
    ) {
      const adminCount = await adminUsersRepository.countAdmins();
      if (adminCount <= 1) {
        throw apiError(400, API_ERROR_CODES.CANNOT_REMOVE_LAST_ADMIN);
      }
    }

    if (
      existing.role === USER_ROLES.ADMIN &&
      nextStatus === USER_STATUS.SUSPENDED
    ) {
      const adminCount = await adminUsersRepository.countAdmins();
      if (adminCount <= 1) {
        throw apiError(400, API_ERROR_CODES.CANNOT_SUSPEND_LAST_ADMIN);
      }
    }

    const user = await adminUsersRepository.updateUser(targetUserId, updates);
    if (!user) {
      throw apiError(404, API_ERROR_CODES.USER_NOT_FOUND);
    }

    return {
      message: "User updated successfully",
      user,
    };
  },
};
