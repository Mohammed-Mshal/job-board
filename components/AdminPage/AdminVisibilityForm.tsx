"use client"

import { adminService } from "@/services/admin.service"
import {
  HOME_SECTION_KEYS,
  NAVIGATION_KEYS,
  PAGE_VISIBILITY_KEYS,
} from "@/features/cms/cms.visibility"
import { SiteVisibilitySettings } from "@/types/cms.types"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

interface AdminVisibilityFormProps {
  initialData: SiteVisibilitySettings
  onSaved: (visibility: SiteVisibilitySettings) => void
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3">
      <span className="text-sm text-[#fafafa]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative admin-toggle w-11 rounded-full transition-colors ${
          checked ? "bg-[#8b5cf6]" : "bg-[#3f3f46]"
        }`}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 size-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  )
}

export default function AdminVisibilityForm({
  initialData,
  onSaved,
}: AdminVisibilityFormProps) {
  const t = useTranslations("AdminPage.visibility")
  const [form, setForm] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const updateHomeSection = (key: (typeof HOME_SECTION_KEYS)[number], value: boolean) => {
    setForm((prev) => ({
      ...prev,
      homeSections: { ...prev.homeSections, [key]: value },
    }))
  }

  const updatePage = (key: (typeof PAGE_VISIBILITY_KEYS)[number], value: boolean) => {
    setForm((prev) => ({
      ...prev,
      pages: { ...prev.pages, [key]: value },
    }))
  }

  const updateNavigation = (key: (typeof NAVIGATION_KEYS)[number], value: boolean) => {
    setForm((prev) => ({
      ...prev,
      navigation: { ...prev.navigation, [key]: value },
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await adminService.updateVisibility(form)
      onSaved(response.visibility)
      toast.success(response.message || t("success"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("error")))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="surface-card space-y-8">
      <div>
        <h2 className="heading-section mb-2">{t("title")}</h2>
        <p className="text-body-sm">{t("description")}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{t("home-sections")}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {HOME_SECTION_KEYS.map((key) => (
            <ToggleRow
              key={key}
              label={t(`home.${key}`)}
              checked={form.homeSections[key]}
              onChange={(value) => updateHomeSection(key, value)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{t("pages-section")}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {PAGE_VISIBILITY_KEYS.map((key) => (
            <ToggleRow
              key={key}
              label={t(`pageLabels.${key}`)}
              checked={form.pages[key]}
              onChange={(value) => updatePage(key, value)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{t("navigation-section")}</h3>
        <p className="text-caption">{t("navigation-hint")}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {NAVIGATION_KEYS.map((key) => (
            <ToggleRow
              key={key}
              label={t(`navigation.${key}`)}
              checked={form.navigation[key]}
              onChange={(value) => updateNavigation(key, value)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => void handleSave()}
        disabled={isSaving}
        className="base-btn btn-primary flex w-fit items-center gap-2 px-8"
      >
        {isSaving && <Loader2 className="size-4 animate-spin" />}
        {isSaving ? t("saving") : t("save")}
      </button>
    </section>
  )
}
