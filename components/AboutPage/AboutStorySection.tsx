import HeaderSection from "@/components/shared/HeaderSection/HeaderSection"
import { getTranslations } from "next-intl/server"
import { AboutStoryCms } from "@/types/cms.types"

export default async function AboutStorySection({
  content,
}: {
  content?: AboutStoryCms
}) {
  const t = await getTranslations("AboutPage.story")

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 xl:max-w-7xl">
        <div className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8 md:p-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <HeaderSection
              title={content?.title ?? t("title")}
              description={content?.description ?? t("description")}
              headerDirection="center"
            />
            <p className="text-center leading-relaxed text-[#A1A1AA]">
              {content?.content ?? t("content")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
