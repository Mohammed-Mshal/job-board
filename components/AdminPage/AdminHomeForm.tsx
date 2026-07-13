"use client"

import { adminService } from "@/services/admin.service"
import { CmsLocale, HomeCmsContent } from "@/types/cms.types"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AdminField } from "./AdminField"
import { AdminAddItemButton, AdminRepeaterItem } from "./AdminRepeater"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

interface AdminHomeFormProps {
  locale: CmsLocale
  initialData: HomeCmsContent
}

const emptyStep = { title: "", description: "", icon: "/user-plus.svg" }
const emptyCard = { image: "/whyChooseUs1.svg", title: "", description: "" }
const emptyStat = { title: "", valueNumber: "" }

export default function AdminHomeForm({ locale, initialData }: AdminHomeFormProps) {
  const t = useTranslations("AdminPage.home")
  const [form, setForm] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await adminService.updateCmsSection(locale, "home", form)
      toast.success(response.message || t("success"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("error")))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <h2 className="mb-6 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
      <div className="grid max-w-3xl gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("banner")}</h3>
          <AdminField label={t("banner-title")} id="bannerTitle" value={form.banner.title} onChange={(v) => setForm((p) => ({ ...p, banner: { ...p.banner, title: v } }))} />
          <AdminField label={t("banner-highlight")} id="bannerHighlight" value={form.banner.titleHighlight} onChange={(v) => setForm((p) => ({ ...p, banner: { ...p.banner, titleHighlight: v } }))} />
          <AdminField label={t("banner-description")} id="bannerDescription" value={form.banner.description} onChange={(v) => setForm((p) => ({ ...p, banner: { ...p.banner, description: v } }))} multiline />
          <AdminField label={t("banner-cta")} id="bannerCta" value={form.banner.cta} onChange={(v) => setForm((p) => ({ ...p, banner: { ...p.banner, cta: v } }))} />
          <AdminField label={t("banner-cta-secondary")} id="bannerCtaSecondary" value={form.banner.ctaSecondary} onChange={(v) => setForm((p) => ({ ...p, banner: { ...p.banner, ctaSecondary: v } }))} />
        </div>

        <AdminField label={t("partner-ticker")} id="partnerTicker" value={form.partnerTickerTitle} onChange={(v) => setForm((p) => ({ ...p, partnerTickerTitle: v }))} />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("partner-ticker-logos")}</h3>
          {form.partnerTickerLogos.map((logo, index) => (
            <AdminRepeaterItem
              key={`logo-${index}`}
              label={`${t("logo-url")} ${index + 1}`}
              canRemove={form.partnerTickerLogos.length > 1}
              removeLabel={t("remove-item")}
              onRemove={() =>
                setForm((p) => ({
                  ...p,
                  partnerTickerLogos: p.partnerTickerLogos.filter((_, i) => i !== index),
                }))
              }
            >
              <AdminField
                label={t("logo-url")}
                id={`partnerLogo${index}`}
                value={logo}
                onChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    partnerTickerLogos: p.partnerTickerLogos.map((item, i) =>
                      i === index ? v : item
                    ),
                  }))
                }
              />
            </AdminRepeaterItem>
          ))}
          <AdminAddItemButton
            label={t("add-item")}
            onClick={() =>
              setForm((p) => ({
                ...p,
                partnerTickerLogos: [...p.partnerTickerLogos, "/microsoft.svg"],
              }))
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("ourValue")}</h3>
          <AdminField label={t("section-title")} id="ourValueTitle" value={form.ourValue.title} onChange={(v) => setForm((p) => ({ ...p, ourValue: { ...p.ourValue, title: v } }))} />
          <AdminField label={t("section-description")} id="ourValueDescription" value={form.ourValue.description} onChange={(v) => setForm((p) => ({ ...p, ourValue: { ...p.ourValue, description: v } }))} multiline />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("howItWorks")}</h3>
          <AdminField label={t("section-title")} id="howItWorksTitle" value={form.howItWorks.title} onChange={(v) => setForm((p) => ({ ...p, howItWorks: { ...p.howItWorks, title: v } }))} />
          <AdminField label={t("section-description")} id="howItWorksDescription" value={form.howItWorks.description} onChange={(v) => setForm((p) => ({ ...p, howItWorks: { ...p.howItWorks, description: v } }))} multiline />
          {form.howItWorks.steps.map((step, index) => (
            <AdminRepeaterItem
              key={`step-${index}`}
              label={`${t("step")} ${index + 1}`}
              canRemove={form.howItWorks.steps.length > 1}
              removeLabel={t("remove-item")}
              onRemove={() =>
                setForm((p) => ({
                  ...p,
                  howItWorks: {
                    ...p.howItWorks,
                    steps: p.howItWorks.steps.filter((_, i) => i !== index),
                  },
                }))
              }
            >
              <AdminField label={t("step-title")} id={`stepTitle${index}`} value={step.title} onChange={(v) => setForm((p) => ({ ...p, howItWorks: { ...p.howItWorks, steps: p.howItWorks.steps.map((s, i) => i === index ? { ...s, title: v } : s) } }))} />
              <AdminField label={t("step-description")} id={`stepDescription${index}`} value={step.description} onChange={(v) => setForm((p) => ({ ...p, howItWorks: { ...p.howItWorks, steps: p.howItWorks.steps.map((s, i) => i === index ? { ...s, description: v } : s) } }))} multiline />
              <AdminField label={t("step-icon")} id={`stepIcon${index}`} value={step.icon} onChange={(v) => setForm((p) => ({ ...p, howItWorks: { ...p.howItWorks, steps: p.howItWorks.steps.map((s, i) => i === index ? { ...s, icon: v } : s) } }))} />
            </AdminRepeaterItem>
          ))}
          <AdminAddItemButton
            label={t("add-item")}
            onClick={() =>
              setForm((p) => ({
                ...p,
                howItWorks: {
                  ...p.howItWorks,
                  steps: [...p.howItWorks.steps, { ...emptyStep }],
                },
              }))
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("whyChooseUs")}</h3>
          <AdminField label={t("section-title")} id="whyChooseUsTitle" value={form.whyChooseUs.title} onChange={(v) => setForm((p) => ({ ...p, whyChooseUs: { ...p.whyChooseUs, title: v } }))} />
          <AdminField label={t("section-description")} id="whyChooseUsDescription" value={form.whyChooseUs.description} onChange={(v) => setForm((p) => ({ ...p, whyChooseUs: { ...p.whyChooseUs, description: v } }))} multiline />
          {form.whyChooseUs.cards.map((card, index) => (
            <AdminRepeaterItem
              key={`card-${index}`}
              label={`${t("card")} ${index + 1}`}
              canRemove={form.whyChooseUs.cards.length > 1}
              removeLabel={t("remove-item")}
              onRemove={() =>
                setForm((p) => ({
                  ...p,
                  whyChooseUs: {
                    ...p.whyChooseUs,
                    cards: p.whyChooseUs.cards.filter((_, i) => i !== index),
                  },
                }))
              }
            >
              <AdminField label={t("card-image")} id={`cardImage${index}`} value={card.image} onChange={(v) => setForm((p) => ({ ...p, whyChooseUs: { ...p.whyChooseUs, cards: p.whyChooseUs.cards.map((c, i) => i === index ? { ...c, image: v } : c) } }))} />
              <AdminField label={t("card-title")} id={`cardTitle${index}`} value={card.title} onChange={(v) => setForm((p) => ({ ...p, whyChooseUs: { ...p.whyChooseUs, cards: p.whyChooseUs.cards.map((c, i) => i === index ? { ...c, title: v } : c) } }))} />
              <AdminField label={t("card-description")} id={`cardDescription${index}`} value={card.description} onChange={(v) => setForm((p) => ({ ...p, whyChooseUs: { ...p.whyChooseUs, cards: p.whyChooseUs.cards.map((c, i) => i === index ? { ...c, description: v } : c) } }))} multiline />
            </AdminRepeaterItem>
          ))}
          <AdminAddItemButton
            label={t("add-item")}
            onClick={() =>
              setForm((p) => ({
                ...p,
                whyChooseUs: {
                  ...p.whyChooseUs,
                  cards: [...p.whyChooseUs.cards, { ...emptyCard }],
                },
              }))
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("featurePath")}</h3>
          <AdminField label={t("section-title")} id="featureTitle" value={form.featurePath.title} onChange={(v) => setForm((p) => ({ ...p, featurePath: { ...p.featurePath, title: v } }))} />
          <AdminField label={t("section-description")} id="featureDescription" value={form.featurePath.description} onChange={(v) => setForm((p) => ({ ...p, featurePath: { ...p.featurePath, description: v } }))} multiline />
          <AdminField label={t("section-cta")} id="featureCta" value={form.featurePath.cta ?? ""} onChange={(v) => setForm((p) => ({ ...p, featurePath: { ...p.featurePath, cta: v } }))} />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("testimonials")}</h3>
          <AdminField label={t("testimonials-subtitle")} id="testimonialsSubtitle" value={form.testimonials.subtitle} onChange={(v) => setForm((p) => ({ ...p, testimonials: { ...p.testimonials, subtitle: v } }))} />
          <AdminField label={t("section-title")} id="testimonialsTitle" value={form.testimonials.title} onChange={(v) => setForm((p) => ({ ...p, testimonials: { ...p.testimonials, title: v } }))} />
          <AdminField label={t("section-description")} id="testimonialsDescription" value={form.testimonials.description} onChange={(v) => setForm((p) => ({ ...p, testimonials: { ...p.testimonials, description: v } }))} multiline />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("stats")}</h3>
          {form.stats.map((stat, index) => (
            <AdminRepeaterItem
              key={`stat-${index}`}
              label={`${t("stat")} ${index + 1}`}
              canRemove={form.stats.length > 1}
              removeLabel={t("remove-item")}
              onRemove={() =>
                setForm((p) => ({
                  ...p,
                  stats: p.stats.filter((_, i) => i !== index),
                }))
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <AdminField label={t("stat-title")} id={`statTitle${index}`} value={stat.title} onChange={(v) => setForm((p) => ({ ...p, stats: p.stats.map((s, i) => i === index ? { ...s, title: v } : s) }))} />
                <AdminField label={t("stat-value")} id={`statValue${index}`} value={stat.valueNumber} onChange={(v) => setForm((p) => ({ ...p, stats: p.stats.map((s, i) => i === index ? { ...s, valueNumber: v } : s) }))} />
              </div>
            </AdminRepeaterItem>
          ))}
          <AdminAddItemButton
            label={t("add-item")}
            onClick={() =>
              setForm((p) => ({
                ...p,
                stats: [...p.stats, { ...emptyStat }],
              }))
            }
          />
        </div>

        <button type="button" onClick={() => void handleSave()} disabled={isSaving} className="base-btn btn-primary flex w-fit items-center gap-2 px-8">
          {isSaving && <Loader2 className="size-4 animate-spin" />}
          {isSaving ? t("saving") : t("save")}
        </button>
      </div>
    </section>
  )
}
