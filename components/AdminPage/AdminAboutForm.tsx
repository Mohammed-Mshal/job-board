"use client"

import { adminService } from "@/services/admin.service"
import { AboutCmsContent, CmsLocale } from "@/types/cms.types"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AdminField } from "./AdminField"
import { AdminAddItemButton, AdminRepeaterItem } from "./AdminRepeater"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

interface AdminAboutFormProps {
  locale: CmsLocale
  initialData: AboutCmsContent
}

export default function AdminAboutForm({ locale, initialData }: AdminAboutFormProps) {
  const t = useTranslations("AdminPage.about")
  const [form, setForm] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await adminService.updateCmsSection(locale, "about", form)
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
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("hero")}</h3>
          <AdminField label={t("subtitle")} id="heroSubtitle" value={form.hero.subtitle} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, subtitle: v } }))} />
          <AdminField label={t("section-title")} id="heroTitle" value={form.hero.title} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, title: v } }))} />
          <AdminField label={t("title-highlight")} id="heroHighlight" value={form.hero.titleHighlight} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, titleHighlight: v } }))} />
          <AdminField label={t("description")} id="heroDescription" value={form.hero.description} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, description: v } }))} multiline />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("mission")}</h3>
          <AdminField label={t("mission-title")} id="missionTitle" value={form.mission.missionTitle} onChange={(v) => setForm((p) => ({ ...p, mission: { ...p.mission, missionTitle: v } }))} />
          <AdminField label={t("mission-description")} id="missionDescription" value={form.mission.missionDescription} onChange={(v) => setForm((p) => ({ ...p, mission: { ...p.mission, missionDescription: v } }))} multiline />
          <AdminField label={t("vision-title")} id="visionTitle" value={form.mission.visionTitle} onChange={(v) => setForm((p) => ({ ...p, mission: { ...p.mission, visionTitle: v } }))} />
          <AdminField label={t("vision-description")} id="visionDescription" value={form.mission.visionDescription} onChange={(v) => setForm((p) => ({ ...p, mission: { ...p.mission, visionDescription: v } }))} multiline />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("values")}</h3>
          <AdminField label={t("section-title")} id="valuesTitle" value={form.values.title} onChange={(v) => setForm((p) => ({ ...p, values: { ...p.values, title: v } }))} />
          <AdminField label={t("section-description")} id="valuesDescription" value={form.values.description} onChange={(v) => setForm((p) => ({ ...p, values: { ...p.values, description: v } }))} multiline />
          {form.values.items.map((item, index) => (
            <AdminRepeaterItem
              key={item.key}
              label={`${t("value")} ${index + 1}`}
              canRemove={form.values.items.length > 1}
              removeLabel={t("remove-item")}
              onRemove={() =>
                setForm((p) => ({
                  ...p,
                  values: {
                    ...p.values,
                    items: p.values.items.filter((_, i) => i !== index),
                  },
                }))
              }
            >
              <AdminField label={t("value-title")} id={`valueTitle${index}`} value={item.title} onChange={(v) => setForm((p) => ({ ...p, values: { ...p.values, items: p.values.items.map((it, i) => i === index ? { ...it, title: v } : it) } }))} />
              <AdminField label={t("value-description")} id={`valueDescription${index}`} value={item.description} onChange={(v) => setForm((p) => ({ ...p, values: { ...p.values, items: p.values.items.map((it, i) => i === index ? { ...it, description: v } : it) } }))} multiline />
            </AdminRepeaterItem>
          ))}
          <AdminAddItemButton
            label={t("add-item")}
            onClick={() =>
              setForm((p) => ({
                ...p,
                values: {
                  ...p.values,
                  items: [
                    ...p.values.items,
                    {
                      key: `value-${Date.now()}`,
                      title: "",
                      description: "",
                    },
                  ],
                },
              }))
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("story")}</h3>
          <AdminField label={t("section-title")} id="storyTitle" value={form.story.title} onChange={(v) => setForm((p) => ({ ...p, story: { ...p.story, title: v } }))} />
          <AdminField label={t("section-description")} id="storyDescription" value={form.story.description} onChange={(v) => setForm((p) => ({ ...p, story: { ...p.story, description: v } }))} />
          <AdminField label={t("story-content")} id="storyContent" value={form.story.content} onChange={(v) => setForm((p) => ({ ...p, story: { ...p.story, content: v } }))} multiline />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("cta")}</h3>
          <AdminField label={t("section-title")} id="ctaTitle" value={form.cta.title} onChange={(v) => setForm((p) => ({ ...p, cta: { ...p.cta, title: v } }))} />
          <AdminField label={t("section-description")} id="ctaDescription" value={form.cta.description} onChange={(v) => setForm((p) => ({ ...p, cta: { ...p.cta, description: v } }))} multiline />
        </div>

        <button type="button" onClick={() => void handleSave()} disabled={isSaving} className="base-btn btn-primary flex w-fit items-center gap-2 px-8">
          {isSaving && <Loader2 className="size-4 animate-spin" />}
          {isSaving ? t("saving") : t("save")}
        </button>
      </div>
    </section>
  )
}
