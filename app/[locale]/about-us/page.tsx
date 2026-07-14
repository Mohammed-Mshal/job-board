import {
  AboutCtaSection,
  AboutHero,
  AboutMissionSection,
  AboutStorySection,
  AboutValuesSection,
} from "@/components/AboutPage"
import { getCmsContent, requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("SEO");

  return buildPageMetadata({
    locale,
    path: "/about-us",
    title: t("about-title"),
    description: t("about-description"),
  });
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requirePageVisible("about");
  const cms = await getCmsContent(locale);

  return (
    <div className="about-us-page space-y-8 lg:space-y-12">
      <AboutHero content={cms.about.hero} />
      <AboutMissionSection content={cms.about.mission} />
      <AboutValuesSection content={cms.about.values} />
      <AboutStorySection content={cms.about.story} />
      <AboutCtaSection content={cms.about.cta} />
    </div>
  )
}
