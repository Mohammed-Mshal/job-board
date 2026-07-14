export type StaticSection = {
  title: string
  paragraphs: string[]
}

export type StaticFaq = {
  question: string
  answer: string
}

export type StaticFeature = {
  title: string
  description: string
}

export type StaticPricingPlan = {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
  href: string
}

export type StaticDocLink = {
  title: string
  description: string
  href: string
  external?: boolean
}
