import {
  AboutCtaSection,
  AboutHero,
  AboutMissionSection,
  AboutStorySection,
  AboutValuesSection,
} from "@/components/AboutPage"
import { getCmsContent } from "@/lib/getCmsContent"

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
