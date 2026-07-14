import connectDB from "@/lib/db";
import { cmsService } from "@/features/cms/cms.services";
import { isCmsLocale } from "@/features/cms/cms.defaults";
import {
  mergeSiteVisibility,
  type PageVisibilityKey,
} from "@/features/cms/cms.visibility";
import { LocaleCmsContent, SiteVisibilitySettings } from "@/types/cms.types";
import { notFound } from "next/navigation";

export async function getCmsContent(locale: string): Promise<LocaleCmsContent> {
  await connectDB();
  return cmsService.getPublicContent(isCmsLocale(locale) ? locale : "en");
}

export async function getSiteVisibility(): Promise<SiteVisibilitySettings> {
  await connectDB();
  const visibility = await cmsService.getPublicVisibility();
  return mergeSiteVisibility(visibility);
}

export async function requirePageVisible(page: PageVisibilityKey): Promise<void> {
  const visibility = await getSiteVisibility();
  if (!visibility.pages[page]) {
    notFound();
  }
}

export type { PageVisibilityKey };
