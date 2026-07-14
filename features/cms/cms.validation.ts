import { z } from "zod";
import {
  HOME_SECTION_KEYS,
  NAVIGATION_KEYS,
  PAGE_VISIBILITY_KEYS,
} from "./cms.visibility";

const generalSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  supportEmail: z.string().email(),
  footerTagline: z.string().min(1),
  footerCopyright: z.string().min(1),
});

const homeSchema = z.object({
  banner: z.object({
    title: z.string().min(1),
    titleHighlight: z.string().min(1),
    description: z.string().min(1),
    cta: z.string().min(1),
    ctaSecondary: z.string().min(1),
    ctaHref: z.string().min(1),
    ctaSecondaryHref: z.string().min(1),
  }),
  partnerTickerTitle: z.string().min(1),
  partnerTickerLogos: z.array(z.string().min(1)).min(1),
  ourValue: z.object({ title: z.string().min(1), description: z.string().min(1) }),
  howItWorks: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    steps: z
      .array(
        z.object({
          title: z.string().min(1),
          description: z.string().min(1),
          icon: z.string().min(1),
        })
      )
      .min(1),
  }),
  whyChooseUs: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    cards: z
      .array(
        z.object({
          image: z.string().min(1),
          title: z.string().min(1),
          description: z.string().min(1),
        })
      )
      .min(1),
  }),
  featurePath: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    cta: z.string().min(1),
  }),
  testimonials: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    description: z.string().min(1),
  }),
  stats: z
    .array(
      z.object({
        title: z.string().min(1),
        valueNumber: z.string().min(1),
      })
    )
    .min(1),
});

const aboutSchema = z.object({
  hero: z.object({
    subtitle: z.string().min(1),
    title: z.string().min(1),
    titleHighlight: z.string().min(1),
    description: z.string().min(1),
  }),
  mission: z.object({
    missionTitle: z.string().min(1),
    missionDescription: z.string().min(1),
    visionTitle: z.string().min(1),
    visionDescription: z.string().min(1),
  }),
  values: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    items: z
      .array(
        z.object({
          key: z.string().min(1),
          title: z.string().min(1),
          description: z.string().min(1),
        })
      )
      .min(1),
  }),
  story: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    content: z.string().min(1),
  }),
  cta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    browseJobs: z.string().min(1),
    browseCompanies: z.string().min(1),
  }),
});

const contactSchema = z.object({
  hero: z.object({
    subtitle: z.string().min(1),
    title: z.string().min(1),
    titleHighlight: z.string().min(1),
    description: z.string().min(1),
  }),
  info: z.object({
    title: z.string().min(1),
    emailTitle: z.string().min(1),
    emailValue: z.string().min(1),
    locationTitle: z.string().min(1),
    locationValue: z.string().min(1),
    hoursTitle: z.string().min(1),
    hoursValue: z.string().min(1),
    supportTitle: z.string().min(1),
    supportDescription: z.string().min(1),
  }),
});

export const localeCmsSchema = z.object({
  general: generalSchema,
  home: homeSchema,
  about: aboutSchema,
  contact: contactSchema,
});

export const updateCmsSchema = z.object({
  locale: z.enum(["en", "ar"]),
  section: z.enum(["general", "home", "about", "contact"]),
  data: z.record(z.string(), z.unknown()),
});

export const updateSubmissionStatusSchema = z.object({
  status: z.enum(["new", "read", "archived"]),
});

const booleanRecordSchema = <T extends readonly string[]>(keys: T) =>
  z.object(
    Object.fromEntries(keys.map((key) => [key, z.boolean()])) as Record<
      T[number],
      z.ZodBoolean
    >
  );

export const siteVisibilitySchema = z.object({
  homeSections: booleanRecordSchema(HOME_SECTION_KEYS),
  pages: booleanRecordSchema(PAGE_VISIBILITY_KEYS),
  navigation: booleanRecordSchema(NAVIGATION_KEYS),
});

export const updateVisibilitySchema = z.object({
  visibility: siteVisibilitySchema,
});
