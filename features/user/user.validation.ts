import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, { message: "nameMin2" }).optional(),
  description: z
    .string()
    .min(10, { message: "descriptionMin10" })
    .optional(),
  location: z.string().min(2, { message: "locationRequired" }).optional(),
  password: z.string().min(1, { message: "currentPasswordRequired" }),
  teamSizeMin: z.number().int().min(1).optional(),
  teamSizeMax: z.number().int().min(1).optional(),
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, { message: "currentPasswordRequired" }),
    newPassword: z
      .string()
      .min(8, { message: "passwordMin8" }),
    newPasswordConfirmation: z
      .string()
      .min(8, { message: "passwordMin8" }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    path: ["newPasswordConfirmation"],
    message: "passwordsDoNotMatch",
  })
  .refine((data) => data.newPassword !== data.password, {
    path: ["newPassword"],
    message: "newPasswordSameAsOld",
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
