import Banner from "@/components/HomePage/Banner/Banner";
import CustomTicker from "@/components/HomePage/CustomTicker/CustomTicker";
import VideoSection from "@/components/HomePage/VideoSection/VideoSection";
import OurValue from "@/components/HomePage/OurValue/OurValue";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";
import FeaturePath from "@/components/HomePage/FeaturePath/FeaturePath";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import { isHomeSectionVisible } from "@/features/cms/cms.visibility";
import { getCmsContent, getSiteVisibility } from "@/lib/getCmsContent";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("SEO");

  return buildPageMetadata({
    locale,
    path: "/",
    title: t("home-title"),
    description: t("home-description"),
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cms, visibility] = await Promise.all([
    getCmsContent(locale),
    getSiteVisibility(),
  ]);

  return (
    <div className="space-y-14 lg:space-y-24 overflow-hidden">
      {isHomeSectionVisible(visibility, "banner") && (
        <Banner content={cms.home.banner} />
      )}
      {isHomeSectionVisible(visibility, "videoSection") && <VideoSection />}
      {isHomeSectionVisible(visibility, "partnerTicker") && (
        <CustomTicker
          title={cms.home.partnerTickerTitle}
          listItems={cms.home.partnerTickerLogos}
        />
      )}
      {isHomeSectionVisible(visibility, "ourValue") && (
        <OurValue sectionContent={cms.home.ourValue} stats={cms.home.stats} />
      )}
      {isHomeSectionVisible(visibility, "howItWorks") && (
        <HowItWorks sectionContent={cms.home.howItWorks} />
      )}
      {isHomeSectionVisible(visibility, "whyChooseUs") && (
        <WhyChooseUs sectionContent={cms.home.whyChooseUs} />
      )}
      {isHomeSectionVisible(visibility, "featurePath") && (
        <FeaturePath sectionContent={cms.home.featurePath} />
      )}
      {isHomeSectionVisible(visibility, "testimonials") && (
        <Testimonials sectionContent={cms.home.testimonials} />
      )}
    </div>
  );
}
