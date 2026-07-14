import { USER_ROLES } from "@/constants/roles";
import connectDB from "@/lib/db";
import { getSiteUrl } from "@/lib/siteUrl";
import { routing } from "@/i18n/routing";
import { Job } from "@/models/job.model";
import { User } from "@/models/user.model";
import type { MetadataRoute } from "next";

const STATIC_PATHS = [
  "",
  "/jobs",
  "/companies",
  "/about-us",
  "/contact-us",
  "/privacy",
  "/terms",
  "/cookies",
  "/security",
  "/help",
  "/docs",
  "/pricing",
  "/candidates",
  "/career-resources",
  "/applications",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  try {
    await connectDB();

    const [jobs, companies] = await Promise.all([
      Job.find({}, "jobId updatedAt").lean(),
      User.find({ role: USER_ROLES.COMPANY }, "userId updatedAt").lean(),
    ]);

    for (const job of jobs) {
      if (!job.jobId) continue;
      for (const locale of routing.locales) {
        entries.push({
          url: `${base}/${locale}/jobs/${job.jobId}`,
          lastModified: job.updatedAt ?? new Date(),
          changeFrequency: "daily",
          priority: 0.9,
        });
      }
    }

    for (const company of companies) {
      if (!company.userId) continue;
      for (const locale of routing.locales) {
        entries.push({
          url: `${base}/${locale}/companies/${company.userId}`,
          lastModified: company.updatedAt ?? new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.error("Sitemap dynamic generation failed:", error);
  }

  return entries;
}
