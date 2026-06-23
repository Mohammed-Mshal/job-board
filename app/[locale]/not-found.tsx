import { Link } from "@/i18n/navigation";
import { PopIn, SlideUp } from "@/components/motion";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFoundPage");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="flex max-w-lg flex-col items-center gap-6">
        <SlideUp delay={0.2}>
          <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D0BCFF] to-[#A078FF] sm:text-8xl">
            404
          </p>
        </SlideUp>

        <SlideUp delay={0.3}>
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {t("title")}
            </h1>
            <p className="text-base text-foreground-muted sm:text-lg">
              {t("description")}
            </p>
          </div>
        </SlideUp>

        <PopIn delay={0.4}>
          <Link href="/" className="base-btn btn-primary">
            {t("cta")}
          </Link>
        </PopIn>
      </div>
    </div>
  );
}
