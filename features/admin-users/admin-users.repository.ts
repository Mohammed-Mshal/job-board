import { escapeRegex } from "@/lib/escapeRegex";
import { IUserDocument, User } from "@/models/user.model";
import { USER_ROLES } from "@/constants/roles";
import { USER_STATUS } from "@/constants/userStatus";
import { PublicUser } from "@/types/api.types";
import type { QueryFilter } from "mongoose";
import {
  ADMIN_USER_SORT_BY_VALUES,
  ListAdminUsersQuery,
} from "./admin-users.validation";

const SORT_FIELD_MAP: Record<
  (typeof ADMIN_USER_SORT_BY_VALUES)[number],
  keyof IUserDocument
> = {
  createdAt: "createdAt",
  name: "name",
};

const SORT_ORDER_MAP = {
  asc: 1,
  desc: -1,
} as const;

function toPublicUser(user: Record<string, unknown>): PublicUser {
  const { password: _password, ...rest } = user;
  return {
    ...(rest as unknown as PublicUser),
    status: (rest.status as PublicUser["status"] | undefined) ?? USER_STATUS.ACTIVE,
  };
}

export const adminUsersRepository = {
  listUsers: async (query: ListAdminUsersQuery) => {
    const filter: QueryFilter<IUserDocument> = {};

    if (query.role !== "all") {
      filter.role = query.role;
    }

    if (query.status !== "all") {
      if (query.status === USER_STATUS.ACTIVE) {
        filter.$or = [
          { status: USER_STATUS.ACTIVE },
          { status: { $exists: false } },
        ];
      } else {
        filter.status = query.status;
      }
    }

    const term = query.search.trim();
    if (term) {
      const escaped = escapeRegex(term);
      const searchFilter = {
        $or: [
          { name: { $regex: escaped, $options: "i" } },
          { email: { $regex: escaped, $options: "i" } },
        ],
      };

      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, searchFilter];
        delete filter.$or;
      } else {
        Object.assign(filter, searchFilter);
      }
    }

    const sortField = SORT_FIELD_MAP[query.sortBy] ?? "createdAt";
    const sortOrderNum = SORT_ORDER_MAP[query.sortOrder] ?? -1;
    const skip = (query.page - 1) * query.limit;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ [sortField]: sortOrderNum })
        .skip(skip)
        .limit(query.limit)
        .populate("profileImage")
        .lean(),
      User.countDocuments(filter),
    ]);

    return {
      users: users.map((user) => toPublicUser(user as unknown as Record<string, unknown>)),
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit) || 0,
    };
  },

  getUserByUserId: async (userId: string) => {
    const user = await User.findOne({ userId })
      .select("-password")
      .populate("profileImage")
      .lean();

    if (!user) return null;
    return toPublicUser(user as unknown as Record<string, unknown>);
  },

  updateUser: async (
    userId: string,
    updates: Partial<Pick<IUserDocument, "role" | "status">>
  ) => {
    const user = await User.findOneAndUpdate({ userId }, updates, {
      new: true,
    })
      .select("-password")
      .populate("profileImage")
      .lean();

    if (!user) return null;
    return toPublicUser(user as unknown as Record<string, unknown>);
  },

  countAdmins: async () => {
    return User.countDocuments({ role: USER_ROLES.ADMIN });
  },

  getStats: async () => {
    const [total, jobSeekers, companies, admins, suspended] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: USER_ROLES.USER }),
      User.countDocuments({ role: USER_ROLES.COMPANY }),
      User.countDocuments({ role: USER_ROLES.ADMIN }),
      User.countDocuments({ status: USER_STATUS.SUSPENDED }),
    ]);

    return { total, jobSeekers, companies, admins, suspended };
  },
};
