export interface FooterLinkItem {
  labelKey: string
  href: string
  external?: boolean
}

export interface FooterColumnConfig {
  id: string
  titleKey: string
  links: FooterLinkItem[]
}

export const footerColumns: FooterColumnConfig[] = [
  {
    id: 'product',
    titleKey: 'product.title',
    links: [
      { labelKey: 'product.findJobs', href: '/jobs' },
      { labelKey: 'product.browseCompanies', href: '/companies' },
      { labelKey: 'product.applications', href: '/applications' },
      { labelKey: 'product.careerResources', href: '/career-resources' },
    ],
  },
  {
    id: 'companies',
    titleKey: 'companies.title',
    links: [
      { labelKey: 'companies.postJob', href: '/post-job' },
      { labelKey: 'companies.findCandidates', href: '/candidates' },
      { labelKey: 'companies.pricing', href: '/pricing' },
      { labelKey: 'companies.recruiterDashboard', href: '/dashboard' },
    ],
  },
  {
    id: 'resources',
    titleKey: 'resources.title',
    links: [
      { labelKey: 'resources.blog', href: '/blog' },
      { labelKey: 'resources.helpCenter', href: '/help' },
      { labelKey: 'resources.documentation', href: '/docs' },
      { labelKey: 'resources.contact', href: '/contact' },
    ],
  },
  {
    id: 'legal',
    titleKey: 'legal.title',
    links: [
      { labelKey: 'legal.privacyPolicy', href: '/privacy' },
      { labelKey: 'legal.termsOfService', href: '/terms' },
      { labelKey: 'legal.cookiesPolicy', href: '/cookies' },
      { labelKey: 'legal.security', href: '/security' },
    ],
  },
]
