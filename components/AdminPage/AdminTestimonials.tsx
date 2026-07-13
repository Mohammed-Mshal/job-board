"use client"

import { adminService } from "@/services/admin.service"
import { ITestimonial, TESTIMONIAL_STATUS, TestimonialStatus } from "@/types/testimonial.types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Loader2, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"
import AdminTestimonialActionModal from "./AdminTestimonialActionModal"

const statusStyles: Record<TestimonialStatus, string> = {
  pending: "bg-[rgba(234,179,8,0.12)] text-[#FACC15]",
  approved: "bg-[rgba(34,197,94,0.12)] text-[#4ADE80]",
  rejected: "bg-[rgba(239,68,68,0.12)] text-[#F87171]",
}

export default function AdminTestimonials() {
  const t = useTranslations("AdminPage.testimonials")
  const [items, setItems] = useState<ITestimonial[]>([])
  const [statusFilter, setStatusFilter] = useState<TestimonialStatus | "all">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [actionId, setActionId] = useState<string | null>(null)
  const [actionTarget, setActionTarget] = useState<{
    testimonial: ITestimonial
    action: TestimonialStatus
  } | null>(null)

  const loadItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await adminService.getTestimonials(statusFilter)
      setItems(data)
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("load-error")))
    } finally {
      setIsLoading(false)
    }
  }, [statusFilter, t])

  useEffect(() => {
    void loadItems()
  }, [loadItems])

  const updateStatus = async (id: string, status: TestimonialStatus) => {
    const item = items.find((entry) => entry._id === id)
    if (!item) return
    setActionTarget({ testimonial: item, action: status })
  }

  const removeItem = async (id: string) => {
    setActionId(id)
    try {
      const response = await adminService.deleteTestimonial(id)
      setItems((prev) => prev.filter((item) => item._id !== id))
      toast.success(response.message || t("deleted"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("delete-error")))
    } finally {
      setActionId(null)
    }
  }

  if (isLoading) {
    return (
      <section className="flex min-h-[240px] items-center justify-center rounded-[20px] border border-[#27272A] bg-[#18181B]">
        <Loader2 className="size-8 animate-spin text-[#D0BCFF]" />
      </section>
    )
  }

  return (
    <>
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as TestimonialStatus | "all")
            }
            className="rounded-xl border border-[#27272A] bg-[#111113] px-3 py-2 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF]"
            aria-label={t("filter-status")}
          >
            <option value="all">{t("statuses.all")}</option>
            <option value={TESTIMONIAL_STATUS.PENDING}>{t("statuses.pending")}</option>
            <option value={TESTIMONIAL_STATUS.APPROVED}>{t("statuses.approved")}</option>
            <option value={TESTIMONIAL_STATUS.REJECTED}>{t("statuses.rejected")}</option>
          </select>
          <button
            type="button"
            onClick={() => void loadItems()}
            className="base-btn btn-secondary px-4 py-2 text-sm"
          >
            {t("refresh")}
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#A1A1AA]">{t("empty")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <article
              key={item._id}
              className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-[#fafafa]">{item.name}</h3>
                <span className="text-sm text-[#A1A1AA]">· {item.jobTitle}</span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold capitalize",
                    statusStyles[item.status]
                  )}
                >
                  {t(`statuses.${item.status}`)}
                </span>
              </div>
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-3.5 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[#CBC3D7]">{item.testimonial}</p>
              <p className="mt-2 text-xs text-[#71717A]">
                {format(new Date(item.createdAt), "PPpp")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.status !== TESTIMONIAL_STATUS.APPROVED && (
                  <button
                    type="button"
                    disabled={actionId === item._id}
                    onClick={() => void updateStatus(item._id, TESTIMONIAL_STATUS.APPROVED)}
                    className="base-btn btn-primary px-3 py-2 text-xs disabled:opacity-50"
                  >
                    {t("approve")}
                  </button>
                )}
                {item.status !== TESTIMONIAL_STATUS.REJECTED && (
                  <button
                    type="button"
                    disabled={actionId === item._id}
                    onClick={() => void updateStatus(item._id, TESTIMONIAL_STATUS.REJECTED)}
                    className="base-btn btn-secondary px-3 py-2 text-xs disabled:opacity-50"
                  >
                    {t("reject")}
                  </button>
                )}
                <button
                  type="button"
                  disabled={actionId === item._id}
                  onClick={() => void removeItem(item._id)}
                  className="base-btn btn-secondary px-3 py-2 text-xs text-[#F87171] disabled:opacity-50"
                >
                  {t("delete")}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>

    <AdminTestimonialActionModal
      open={Boolean(actionTarget)}
      testimonial={actionTarget?.testimonial ?? null}
      action={actionTarget?.action ?? null}
      onClose={() => setActionTarget(null)}
      onSuccess={(testimonial) => {
        setItems((prev) =>
          prev.map((item) => (item._id === testimonial._id ? testimonial : item))
        )
      }}
    />
    </>
  )
}
