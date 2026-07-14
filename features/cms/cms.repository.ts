import { SiteContent } from "@/models/site-content.model";
import { ContactSubmission } from "@/models/contact-submission.model";
import { CMS_DEFAULTS, CMS_SLUG } from "./cms.defaults";
import { mergeSiteVisibility } from "./cms.visibility";
import { CmsLocale, ContactSubmissionStatus, LocaleCmsContent, SiteVisibilitySettings } from "@/types/cms.types";

export const cmsRepository = {
  findSiteContent: async () => {
    return await SiteContent.findOne({ slug: CMS_SLUG }).lean();
  },

  upsertSiteContent: async (
    content: Record<CmsLocale, LocaleCmsContent>,
    updatedBy?: string,
    visibility?: SiteVisibilitySettings
  ) => {
    const update: Record<string, unknown> = {
      slug: CMS_SLUG,
      content,
      updatedBy,
    };

    if (visibility) {
      update.visibility = visibility;
    }

    return await SiteContent.findOneAndUpdate(
      { slug: CMS_SLUG },
      update,
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean();
  },

  updateVisibility: async (visibility: SiteVisibilitySettings, updatedBy?: string) => {
    return await SiteContent.findOneAndUpdate(
      { slug: CMS_SLUG },
      { slug: CMS_SLUG, visibility, updatedBy },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean();
  },

  createContactSubmission: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return await ContactSubmission.create(data);
  },

  listContactSubmissions: async (status?: ContactSubmissionStatus) => {
    const filter = status ? { status } : {};
    return await ContactSubmission.find(filter).sort({ createdAt: -1 }).lean();
  },

  updateSubmissionStatus: async (id: string, status: ContactSubmissionStatus) => {
    return await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" }
    ).lean();
  },

  getDefaultContent: () => CMS_DEFAULTS,
};
