export type CmsLocale = "en" | "ar";

export interface GeneralCmsContent {
  siteName: string;
  siteDescription: string;
  supportEmail: string;
  footerTagline: string;
  footerCopyright: string;
}

export interface HomeBannerCms {
  title: string;
  titleHighlight: string;
  description: string;
  cta: string;
  ctaSecondary: string;
  ctaHref: string;
  ctaSecondaryHref: string;
}

export interface HomeSectionTitleCms {
  title: string;
  description: string;
  cta?: string;
}

export interface HomeStepCms {
  title: string;
  description: string;
  icon: string;
}

export interface HomeWhyChooseUsCardCms {
  image: string;
  title: string;
  description: string;
}

export interface HomeHowItWorksCms extends HomeSectionTitleCms {
  steps: HomeStepCms[];
}

export interface HomeWhyChooseUsCms extends HomeSectionTitleCms {
  cards: HomeWhyChooseUsCardCms[];
}

export interface HomeStatCms {
  title: string;
  valueNumber: string;
}

export interface HomeCmsContent {
  banner: HomeBannerCms;
  partnerTickerTitle: string;
  partnerTickerLogos: string[];
  ourValue: HomeSectionTitleCms;
  howItWorks: HomeHowItWorksCms;
  whyChooseUs: HomeWhyChooseUsCms;
  featurePath: HomeSectionTitleCms;
  testimonials: HomeSectionTitleCms & { subtitle: string };
  stats: HomeStatCms[];
}

export interface AboutHeroCms {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
}

export interface AboutMissionCms {
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
}

export interface AboutValueItemCms {
  key: string;
  title: string;
  description: string;
}

export interface AboutValuesCms {
  title: string;
  description: string;
  items: AboutValueItemCms[];
}

export interface AboutStoryCms {
  title: string;
  description: string;
  content: string;
}

export interface AboutCtaCms {
  title: string;
  description: string;
  browseJobs: string;
  browseCompanies: string;
}

export interface AboutCmsContent {
  hero: AboutHeroCms;
  mission: AboutMissionCms;
  values: AboutValuesCms;
  story: AboutStoryCms;
  cta: AboutCtaCms;
}

export interface ContactHeroCms {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
}

export interface ContactInfoCms {
  title: string;
  emailTitle: string;
  emailValue: string;
  locationTitle: string;
  locationValue: string;
  hoursTitle: string;
  hoursValue: string;
  supportTitle: string;
  supportDescription: string;
}

export interface ContactCmsContent {
  hero: ContactHeroCms;
  info: ContactInfoCms;
}

export interface LocaleCmsContent {
  general: GeneralCmsContent;
  home: HomeCmsContent;
  about: AboutCmsContent;
  contact: ContactCmsContent;
}

export interface SiteCmsDocument {
  slug: string;
  content: Record<CmsLocale, LocaleCmsContent>;
  updatedAt: string;
  updatedBy?: string;
}

export type CmsSection = keyof LocaleCmsContent;

export type ContactSubmissionStatus = "new" | "read" | "archived";

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactSubmissionStatus;
  createdAt: string;
  updatedAt: string;
}
