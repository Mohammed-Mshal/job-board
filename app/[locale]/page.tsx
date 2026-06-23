import Banner from "@/components/HomePage/Banner/Banner";
import CustomTicker from "@/components/HomePage/CustomTicker/CustomTicker";
import VideoSection from "@/components/HomePage/VideoSection/VideoSection";
import { getTranslations } from "next-intl/server";
import OurValue from "@/components/HomePage/OurValue/OurValue";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";
import FeaturePath from "@/components/HomePage/FeaturePath/FeaturePath";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
export default async function Home() {
  const t = await getTranslations()
  return (
    <div className="space-y-14 lg:space-y-24 overflow-hidden">
        <Banner />
        <VideoSection/>
        <CustomTicker title={t('partnering-with-industry-leaders')} listItems={['/microsoft.svg','/microsoft.svg','/microsoft.svg','/microsoft.svg','/microsoft.svg','/microsoft.svg',]}/>
        <OurValue />
        <HowItWorks />
        <WhyChooseUs />
        <FeaturePath />
        <Testimonials />
    </div>
  );
}
