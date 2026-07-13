import { getTranslations } from "next-intl/server"
import { Clock, Mail, MapPin } from "lucide-react"
import { ContactInfoCms } from "@/types/cms.types"

export default async function ContactInfo({ content }: { content?: ContactInfoCms }) {
  const t = await getTranslations("ContactPage.info")
  const emailValue = content?.emailValue ?? t("email-value")

  const items = [
    {
      icon: Mail,
      title: content?.emailTitle ?? t("email-title"),
      value: emailValue,
      href: `mailto:${emailValue}`,
    },
    {
      icon: MapPin,
      title: content?.locationTitle ?? t("location-title"),
      value: content?.locationValue ?? t("location-value"),
    },
    {
      icon: Clock,
      title: content?.hoursTitle ?? t("hours-title"),
      value: content?.hoursValue ?? t("hours-value"),
    },
  ]

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8">
        <h2 className="mb-6 text-xl font-semibold text-[#fafafa]">
          {content?.title ?? t("title")}
        </h2>
        <ul className="flex flex-col gap-6">
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(208,188,255,0.1)]">
                <item.icon className="text-[#D0BCFF]" size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#71717A]">{item.title}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#fafafa] transition-colors hover:text-[#D0BCFF]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-[#fafafa]">{item.value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8">
        <h3 className="mb-3 text-lg font-semibold text-[#fafafa]">
          {content?.supportTitle ?? t("support-title")}
        </h3>
        <p className="text-sm leading-relaxed text-[#A1A1AA]">
          {content?.supportDescription ?? t("support-description")}
        </p>
      </div>
    </aside>
  )
}
