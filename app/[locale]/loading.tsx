import { Loader2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Loading");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2
        className="size-10 animate-spin text-primary"
        aria-hidden
      />
      <p className="text-lg font-medium text-foreground-muted">
        {t("loading")}
      </p>
    </div>
  );
}
