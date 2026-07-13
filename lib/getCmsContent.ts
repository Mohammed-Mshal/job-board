import connectDB from "@/lib/db";
import { cmsService } from "@/features/cms/cms.services";
import { isCmsLocale } from "@/features/cms/cms.defaults";
import { LocaleCmsContent } from "@/types/cms.types";

export async function getCmsContent(locale: string): Promise<LocaleCmsContent> {
  await connectDB();
  return cmsService.getPublicContent(isCmsLocale(locale) ? locale : "en");
}
