"use client";
import { LoginCredentials } from "@/types/api.types";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { HttpError } from "@/lib/httpError";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const t = useTranslations("forms");
  const onSubmit = async (data: LoginCredentials) => {
    try {
        await login(data)
        toast.success(t("loginSuccess"));
        router.push(callbackUrl || "/");
        router.refresh();
    } catch (error) {      
        if (error instanceof AxiosError) {            
            toast.error(error.response?.data.error ?? "An unexpected error occurred");
            return;
        }
        else if(error instanceof HttpError){
            toast.error(error.message ?? "An unexpected error occurred");
            return;
        }
        toast.error("An unexpected error occurred");
        return;
    }
  };
  console.log(errors);
  
  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t("email.label")}</Label>
        <Input
          type="email"
          id="email"
          placeholder={t("email.placeholder")}
          {...register("email", {
            required: t("email.required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("email.invalid"),
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">{t("password.label")}</Label>
        <Input
          type="password"
          id="email"
          placeholder={t("password.placeholder")}
          {...register("password", {
            required: t("password.required"),
            minLength: {
              value: 8,
              message: t("password.minLength"),
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      {
        error && (
          <p className="text-red-500 text-center">{error}</p>
        )
      }
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-lg btn btn-primary cursor-pointer py-3">
        {isSubmitting ? t("logging-in") : t("login")}
      </Button>
    </form>
  );
}
