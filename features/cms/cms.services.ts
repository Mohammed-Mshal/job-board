import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { formatZodErrorToRecord } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { authService } from "../auth/auth.services";
import { cmsRepository } from "./cms.repository";
import { CMS_DEFAULTS, CMS_SLUG, isCmsLocale, mergeLocaleContent } from "./cms.defaults";
import { mergeSiteVisibility } from "./cms.visibility";
import {
  localeCmsSchema,
  updateCmsSchema,
  updateSubmissionStatusSchema,
  updateVisibilitySchema,
} from "./cms.validation";
import {
  CmsLocale,
  CmsSection,
  ContactSubmissionStatus,
  LocaleCmsContent,
  SiteVisibilitySettings,
} from "@/types/cms.types";
import { z } from "zod";

const sectionSchemas: Record<CmsSection, z.ZodType> = {
  general: localeCmsSchema.shape.general,
  home: localeCmsSchema.shape.home,
  about: localeCmsSchema.shape.about,
  contact: localeCmsSchema.shape.contact,
};

export const cmsService = {
  ensureSiteContent: async () => {
    const existing = await cmsRepository.findSiteContent();
    if (existing?.content?.en && existing?.content?.ar) {
      if (!existing.visibility) {
        return await cmsRepository.updateVisibility(
          mergeSiteVisibility(undefined),
          existing.updatedBy
        );
      }
      return existing;
    }

    return await cmsRepository.upsertSiteContent(
      CMS_DEFAULTS,
      undefined,
      mergeSiteVisibility(undefined)
    );
  },

  getPublicVisibility: async (): Promise<SiteVisibilitySettings> => {
    const doc = await cmsService.ensureSiteContent();
    return mergeSiteVisibility(doc.visibility as SiteVisibilitySettings | undefined);
  },

  getPublicContent: async (locale: string): Promise<LocaleCmsContent> => {
    const cmsLocale: CmsLocale = isCmsLocale(locale) ? locale : "en";
    const doc = await cmsService.ensureSiteContent();
    const content = doc.content as Record<CmsLocale, LocaleCmsContent>;
    const localeContent = content[cmsLocale] ?? CMS_DEFAULTS[cmsLocale];
    return mergeLocaleContent(localeContent, cmsLocale);
  },

  getAdminContent: async () => {
    await authService.getAdminUser();
    const doc = await cmsService.ensureSiteContent();
    const content = doc.content as Record<CmsLocale, LocaleCmsContent>;
    return {
      slug: CMS_SLUG,
      content: {
        en: mergeLocaleContent(content.en, "en"),
        ar: mergeLocaleContent(content.ar, "ar"),
      },
      visibility: mergeSiteVisibility(doc.visibility as SiteVisibilitySettings | undefined),
      updatedAt: doc.updatedAt,
      updatedBy: doc.updatedBy,
    };
  },

  updateVisibility: async (visibility: SiteVisibilitySettings) => {
    const admin = await authService.getAdminUser();
    const result = updateVisibilitySchema.safeParse({ visibility });
    if (!result.success) {
      throw new HttpError(400, {
        errors: formatZodErrorToRecord(result.error),
      });
    }

    await cmsService.ensureSiteContent();
    const saved = await cmsRepository.updateVisibility(
      result.data.visibility,
      admin.userId
    );

    return {
      message: "Visibility updated successfully",
      visibility: mergeSiteVisibility(saved?.visibility as SiteVisibilitySettings | undefined),
    };
  },

  updateSection: async (
    locale: CmsLocale,
    section: CmsSection,
    data: unknown
  ) => {
    const admin = await authService.getAdminUser();
    const result = updateCmsSchema.safeParse({ locale, section, data });
    if (!result.success) {
      throw new HttpError(400, {
        errors: formatZodErrorToRecord(result.error),
      });
    }

    const sectionResult = sectionSchemas[section].safeParse(data);
    if (!sectionResult.success) {
      throw new HttpError(400, {
        errors: formatZodErrorToRecord(sectionResult.error),
      });
    }

    const doc = await cmsService.ensureSiteContent();
    const content = doc.content as Record<CmsLocale, LocaleCmsContent>;
    const updatedContent: Record<CmsLocale, LocaleCmsContent> = {
      ...content,
      [locale]: {
        ...content[locale],
        [section]: sectionResult.data,
      },
    };

    const saved = await cmsRepository.upsertSiteContent(
      updatedContent,
      admin.userId
    );

    return {
      message: "Content updated successfully",
      content: saved?.content,
    };
  },

  listSubmissions: async (status?: ContactSubmissionStatus) => {
    await authService.getAdminUser();
    return await cmsRepository.listContactSubmissions(status);
  },

  updateSubmissionStatus: async (id: string, status: ContactSubmissionStatus) => {
    await authService.getAdminUser();
    const result = updateSubmissionStatusSchema.safeParse({ status });
    if (!result.success) {
      throw new HttpError(400, {
        errors: formatZodErrorToRecord(result.error),
      });
    }

    const submission = await cmsRepository.updateSubmissionStatus(id, status);
    if (!submission) {
      throw apiError(404, API_ERROR_CODES.SUBMISSION_NOT_FOUND);
    }

    return {
      message: "Submission updated successfully",
      submission,
    };
  },

  createSubmission: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return await cmsRepository.createContactSubmission(data);
  },
};
