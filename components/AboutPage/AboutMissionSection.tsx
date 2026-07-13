import { getTranslations } from "next-intl/server"
import { Target, Eye } from "lucide-react"
import { AboutMissionCms } from "@/types/cms.types"

export default async function AboutMissionSection({
  content,
}: {
  content?: AboutMissionCms
}) {
  const t = await getTranslations("AboutPage.mission")

  const items = [
    {
      icon: Target,
      title: content?.missionTitle ?? t("mission-title"),
      description: content?.missionDescription ?? t("mission-description"),
    },
    {
      icon: Eye,
      title: content?.visionTitle ?? t("vision-title"),
      description: content?.visionDescription ?? t("vision-description"),
    },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 xl:max-w-7xl">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex flex-col gap-4 rounded-[20px] border border-[#27272A] bg-[#18181B] p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(208,188,255,0.1)]">
              <item.icon className="text-[#D0BCFF]" size={22} />
            </div>
            <h2 className="text-xl font-semibold text-[#fafafa]">{item.title}</h2>
            <p className="leading-relaxed text-[#A1A1AA]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
