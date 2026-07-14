export type HomeSectionKey =
  | "banner"
  | "videoSection"
  | "partnerTicker"
  | "ourValue"
  | "howItWorks"
  | "whyChooseUs"
  | "featurePath"
  | "testimonials";

export type PageVisibilityKey =
  | "jobs"
  | "companies"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "cookies"
  | "security"
  | "help"
  | "docs"
  | "pricing"
  | "candidates"
  | "careerResources"
  | "applications";

export type NavigationKey = "home" | "jobs" | "companies" | "about" | "contact";

export interface SiteVisibilitySettings {
  homeSections: Record<HomeSectionKey, boolean>;
  pages: Record<PageVisibilityKey, boolean>;
  navigation: Record<NavigationKey, boolean>;
}

export const HOME_SECTION_KEYS: HomeSectionKey[] = [
  "banner",
  "videoSection",
  "partnerTicker",
  "ourValue",
  "howItWorks",
  "whyChooseUs",
  "featurePath",
  "testimonials",
];

export const PAGE_VISIBILITY_KEYS: PageVisibilityKey[] = [
  "jobs",
  "companies",
  "about",
  "contact",
  "privacy",
  "terms",
  "cookies",
  "security",
  "help",
  "docs",
  "pricing",
  "candidates",
  "careerResources",
  "applications",
];

export const NAVIGATION_KEYS: NavigationKey[] = [
  "home",
  "jobs",
  "companies",
  "about",
  "contact",
];

export const DEFAULT_SITE_VISIBILITY: SiteVisibilitySettings = {
  homeSections: {
    banner: true,
    videoSection: true,
    partnerTicker: true,
    ourValue: true,
    howItWorks: true,
    whyChooseUs: true,
    featurePath: true,
    testimonials: true,
  },
  pages: {
    jobs: true,
    companies: true,
    about: true,
    contact: true,
    privacy: true,
    terms: true,
    cookies: true,
    security: true,
    help: true,
    docs: true,
    pricing: true,
    candidates: true,
    careerResources: true,
    applications: true,
  },
  navigation: {
    home: true,
    jobs: true,
    companies: true,
    about: true,
    contact: true,
  },
};

export const ROUTE_TO_PAGE_KEY: Record<string, PageVisibilityKey> = {
  "/jobs": "jobs",
  "/companies": "companies",
  "/about-us": "about",
  "/contact-us": "contact",
  "/privacy": "privacy",
  "/terms": "terms",
  "/cookies": "cookies",
  "/security": "security",
  "/help": "help",
  "/docs": "docs",
  "/pricing": "pricing",
  "/candidates": "candidates",
  "/career-resources": "careerResources",
  "/applications": "applications",
};

export const NAV_ROUTE_ID_TO_KEY: Record<string, NavigationKey> = {
  home: "home",
  "browse-jobs": "jobs",
  companies: "companies",
  "about-us": "about",
  "contact-us": "contact",
};

export function mergeSiteVisibility(
  value?: Partial<SiteVisibilitySettings> | null
): SiteVisibilitySettings {
  return {
    homeSections: {
      ...DEFAULT_SITE_VISIBILITY.homeSections,
      ...value?.homeSections,
    },
    pages: {
      ...DEFAULT_SITE_VISIBILITY.pages,
      ...value?.pages,
    },
    navigation: {
      ...DEFAULT_SITE_VISIBILITY.navigation,
      ...value?.navigation,
    },
  };
}

export function isHomeSectionVisible(
  visibility: SiteVisibilitySettings,
  section: HomeSectionKey
): boolean {
  return visibility.homeSections[section] ?? true;
}

export function isPageVisible(
  visibility: SiteVisibilitySettings,
  page: PageVisibilityKey
): boolean {
  return visibility.pages[page] ?? true;
}

export function isNavigationVisible(
  visibility: SiteVisibilitySettings,
  key: NavigationKey
): boolean {
  return visibility.navigation[key] ?? true;
}

export function isRoutePageVisible(
  visibility: SiteVisibilitySettings,
  href: string
): boolean {
  const pageKey = ROUTE_TO_PAGE_KEY[href];
  if (!pageKey) return true;
  return isPageVisible(visibility, pageKey);
}

export function filterFooterColumns<
  T extends { links: Array<{ href: string }> },
>(columns: T[], visibility: SiteVisibilitySettings): T[] {
  return columns.map((column) => ({
    ...column,
    links: column.links.filter((link) => isRoutePageVisible(visibility, link.href)),
  }));
}
