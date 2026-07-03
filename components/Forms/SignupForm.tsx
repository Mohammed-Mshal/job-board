"use client";

import { registerSchema } from "@/features/auth/auth.validation";
import { USER_ROLES } from "@/constants/roles";
import { HttpError } from "@/lib/httpError";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/store/auth.store";
import { RegisterCredentials } from "@/types/api.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Building2, Check, User } from "lucide-react";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function SignupForm() {
  const t = useTranslations("forms");
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: USER_ROLES.USER,
      location: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const error = useAuthStore((state) => state.error);
  const register = useAuthStore((state) => state.register);

  const onSubmit = async (data: RegisterFormValues) => {
    const credentials: RegisterCredentials = {
      ...data,
      profileImage: null,
    };
    try {
      
      await register(credentials);
      toast.success(t("registerSuccess"));
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.error ?? "An unexpected error occurred",
        );
        return;
      }
      if (error instanceof HttpError) {
        toast.error(error.message ?? "An unexpected error occurred");
        return;
      }
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4">

        <Label htmlFor="user" className="user-type-choice">
          <input
            type="radio"
            defaultChecked
            id="user"
            value="user"
            {...registerForm("role")}
            className="hidden"
          />
          <div className="icon h-12 w-12 rounded-xl bg-[#D0BCFF]/10 flex items-center justify-center">
            <User className="size-4.5 text-[#D0BCFF]"/>
          </div>
          <div className="info-choose">
            <h3 className="text-lg font-bold text-[#D0BCFF]">I&apos;m a Candidate</h3>
            <p className="text-sm text-[#A1A1AA] hidden sm:block">
              Explore elite career opportunities and
              <br />
              manage your applications.
            </p>
          </div>
          <Check className="check-mark"/>
        </Label>

        <Label htmlFor="company" className="user-type-choice">
          <input
            type="radio"
            id="company"
            value="company"
            {...registerForm("role")}
            className="hidden"
          />
          <div className="icon h-12 w-12 rounded-xl bg-[#FFB869]/10 flex items-center justify-center">
            <Building2 className="size-4.5 text-[#FFB869]"/>
          </div>
          <div className="info-choose">
            <h3 className="text-lg font-bold text-[#D0BCFF]">I&apos;m a Recruiter</h3>
            <p className="text-sm text-[#A1A1AA] hidden sm:block">
              Source premium talent and manage your
              <br />
              company&apos;s hiring pipeline.
            </p>
          </div>
          <Check className="check-mark"/>

        </Label>

      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="name">{t("name.label")}</Label>
          <Input
            type="text"
            id="name"
            placeholder={t("name.placeholder")}
            {...registerForm("name")}
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="email">{t("email.label")}</Label>
          <Input
            type="email"
            id="email"
            placeholder={t("email.placeholder")}
            {...registerForm("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="password">{t("password.label")}</Label>
          <Input
            type="password"
            id="password"
            placeholder={t("password.placeholder")}
            {...registerForm("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="confirmPassword">{t("confirmPassword.label")}</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder={t("confirmPassword.placeholder")}
            {...registerForm("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="location">{t("location.label")}</Label>
          <Input
            type="text"
            id="location"
            placeholder={t("location.placeholder")}
            {...registerForm("location")}
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="description">{t("description.label")}</Label>
          <textarea
            id="description"
            className="w-full min-w-0 rounded-xl border border-[rgba(73,68,84,0.3)] bg-[#111113] px-4 py-3.5 text-base transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:[#71717A]  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
            placeholder={t("description.placeholder")}
            {...registerForm("description")}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full base-btn btn-primary cursor-pointer py-3"
      >
        {isSubmitting ? t("registering") : t("register")}
      </button>
    </form>
  );
}
