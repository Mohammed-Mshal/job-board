import { USER_ROLES, UserRoleType } from "@/constants/roles";
import { USER_STATUS, UserStatusType } from "@/constants/userStatus";
import { z } from "zod";

export const ADMIN_USER_SORT_BY_VALUES = ["createdAt", "name"] as const;

const roleFilterValues = ["all", ...Object.values(USER_ROLES)] as const;
const statusFilterValues = ["all", ...Object.values(USER_STATUS)] as const;

export const listAdminUsersQuerySchema = z.object({
  search: z.string().max(200).optional().default(""),
  role: z.enum(roleFilterValues).default("all"),
  status: z.enum(statusFilterValues).default("all"),
  sortBy: z.enum(ADMIN_USER_SORT_BY_VALUES).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type ListAdminUsersQuery = z.infer<typeof listAdminUsersQuerySchema>;

export const listAdminUsersQueryValidation = (
  params: Record<string, string | undefined>
) => listAdminUsersQuerySchema.safeParse(params);

export const updateAdminUserSchema = z
  .object({
    role: z.enum(Object.values(USER_ROLES) as [UserRoleType, ...UserRoleType[]]).optional(),
    status: z.enum(Object.values(USER_STATUS) as [UserStatusType, ...UserStatusType[]]).optional(),
  })
  .refine((data) => data.role !== undefined || data.status !== undefined, {
    message: "atLeastOneFieldRequired",
  });

export type UpdateAdminUserInput = z.infer<typeof updateAdminUserSchema>;

export const updateAdminUserValidation = (body: unknown) =>
  updateAdminUserSchema.safeParse(body);
