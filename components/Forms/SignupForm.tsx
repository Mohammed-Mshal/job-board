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
import { Textarea } from "../ui/textarea";
import { Building2, Check, User } from "lucide-react";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function SignupForm() {
  const t = useTranslations("forms");
  const tSignup = useTranslations("Signup");
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
      className="form-stack"
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
            <h3 className="text-base font-semibold text-[var(--accent)] sm:text-lg">{tSignup("role.candidate.title")}</h3>
            <p className="text-body-sm hidden sm:block">
              {tSignup("role.candidate.description")}
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
            <h3 className="text-base font-semibold text-[var(--accent)] sm:text-lg">{tSignup("role.recruiter.title")}</h3>
            <p className="text-body-sm hidden sm:block">
              {tSignup("role.recruiter.description")}
            </p>
          </div>
          <Check className="check-mark"/>

        </Label>

      </div>
      <div className="form-grid">
        <div className="form-field">
          <Label htmlFor="name">{t("name.label")}</Label>
          <Input
            type="text"
            id="name"
            placeholder={t("name.placeholder")}
            {...registerForm("name")}
          />
          {errors.name && (
            <p className="form-error">{errors.name.message}</p>
          )}
        </div>
        <div className="form-field">
          <Label htmlFor="email">{t("email.label")}</Label>
          <Input
            type="email"
            id="email"
            placeholder={t("email.placeholder")}
            {...registerForm("email")}
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <Label htmlFor="password">{t("password.label")}</Label>
          <Input
            type="password"
            id="password"
            placeholder={t("password.placeholder")}
            {...registerForm("password")}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-field">
          <Label htmlFor="confirmPassword">{t("confirmPassword.label")}</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder={t("confirmPassword.placeholder")}
            {...registerForm("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
      <div className="form-field">
          <Label htmlFor="location">{t("location.label")}</Label>
          <Input
            type="text"
            id="location"
            placeholder={t("location.placeholder")}
            {...registerForm("location")}
          />
          {errors.location && (
            <p className="form-error">{errors.location.message}</p>
          )}
      </div>
      <div className="form-field">
          <Label htmlFor="description">{t("description.label")}</Label>
          <Textarea
            id="description"
            rows={5}
            placeholder={t("description.placeholder")}
            {...registerForm("description")}
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
      </div>
      {error && <p className="form-error text-center">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="base-btn btn-primary w-full py-3"
      >
        {isSubmitting ? t("registering") : t("register")}
      </button>
    </form>
  );
}
