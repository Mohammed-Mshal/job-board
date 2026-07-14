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
      <div className="surface-card">
        <h2 className="heading-section">
          {content?.title ?? t("title")}
        </h2>
        <ul className="flex flex-col gap-6">
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <div className="icon-badge">
                <item.icon size={20} />
              </div>
              <div className="form-field gap-1">
                <span className="text-caption">{item.title}</span>
                {item.href ? (
                  <a href={item.href} className="text-sm text-[var(--foreground)] transition-colors hover:text-[var(--accent)]">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm text-[var(--foreground)]">{item.value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="surface-card">
        <h3 className="heading-subsection">
          {content?.supportTitle ?? t("support-title")}
        </h3>
        <p className="text-body-sm">
          {content?.supportDescription ?? t("support-description")}
        </p>
      </div>
    </aside>
  )
}
