import { USER_ROLES, UserRoleType } from "@/constants/roles";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "invalidEmail" }),
  password: z
    .string()
    .min(8, { message: "passwordMin8" }),
});

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "nameMin3" }),
  email: z.string().email({ message: "invalidEmail" }),
  password: z.string().min(8, { message: "passwordMin8" }),
  confirmPassword: z.string().min(8, { message: "passwordMin8" }),
  role: z.enum(Object.values(USER_ROLES) as [UserRoleType, ...UserRoleType[]]),
  location: z.string().min(3, { message: "locationMin3" }),
  description: z.string().min(10, { message: "descriptionMin10" }),
  teamSize: z.object({
    min: z.number().min(1, { message: "teamSizeMin1" }),
    max: z.number().min(1, { message: "teamSizeMin1" }),
  }), 
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordsDoNotMatch",
  })
  .refine((data) => data.teamSize.min <= data.teamSize.max, {
    path: ["teamSize"],
    message: "teamSizeMinMax",
  });


const loginValidation = (data: z.infer<typeof loginSchema>) =>
  loginSchema.safeParse(data);
const registerValidation = (data: z.infer<typeof registerSchema>) =>
  registerSchema.safeParse(data);
export { loginSchema, registerSchema , loginValidation, registerValidation };
