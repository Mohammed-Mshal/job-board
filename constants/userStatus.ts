export const USER_STATUS = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
} as const;

export type UserStatusType = (typeof USER_STATUS)[keyof typeof USER_STATUS];
