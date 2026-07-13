import Banner from "@/components/HomePage/Banner/Banner";
import CustomTicker from "@/components/HomePage/CustomTicker/CustomTicker";
import VideoSection from "@/components/HomePage/VideoSection/VideoSection";
import OurValue from "@/components/HomePage/OurValue/OurValue";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";
import FeaturePath from "@/components/HomePage/FeaturePath/FeaturePath";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import { getCmsContent } from "@/lib/getCmsContent";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cms = await getCmsContent(locale);

  return (
    <div className="space-y-14 lg:space-y-24 overflow-hidden">
        <Banner content={cms.home.banner} />
        <VideoSection/>
        <CustomTicker title={cms.home.partnerTickerTitle} listItems={cms.home.partnerTickerLogos} />
        <OurValue sectionContent={cms.home.ourValue} stats={cms.home.stats} />
        <HowItWorks sectionContent={cms.home.howItWorks} />
        <WhyChooseUs sectionContent={cms.home.whyChooseUs} />
        <FeaturePath sectionContent={cms.home.featurePath} />
        <Testimonials sectionContent={cms.home.testimonials} />
    </div>
  );
}
