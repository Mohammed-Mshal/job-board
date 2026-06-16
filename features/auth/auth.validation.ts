import { USER_ROLES } from "@/constants/roles";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(Object.values(USER_ROLES)).default(USER_ROLES.USER),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});


const loginValidation = (data: z.infer<typeof loginSchema>) =>
  loginSchema.safeParse(data);
const registerValidation = (data: z.infer<typeof registerSchema>) =>
  registerSchema.safeParse(data);
export { loginSchema, registerSchema , loginValidation, registerValidation };
