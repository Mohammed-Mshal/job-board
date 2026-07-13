"use client"

import { userMessageService } from "@/services/user-message.service"
import { IUserMessage } from "@/types/user-message.types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Loader2, Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "./profile.utils"

export default function ProfileMessages() {
  const t = useTranslations("ProfilePage.messages")
  const [messages, setMessages] = useState<IUserMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionId, setActionId] = useState<string | null>(null)

  const loadMessages = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await userMessageService.getMessages()
      setMessages(data.messages)
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("load-error")))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await userMessageService.getMessages()
        if (cancelled) return
        setMessages(data.messages)
      } catch (error) {
        if (cancelled) return
        toast.error(getApiErrorMessage(error, t("load-error")))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [t])

  const markAsRead = async (id: string) => {
    setActionId(id)
    try {
      const response = await userMessageService.markAsRead(id)
      setMessages((prev) =>
        prev.map((item) => (item._id === id ? response.userMessage : item))
      )
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("mark-read-error")))
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

  if (messages.length === 0) {
    return (
      <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8 text-center">
        <Mail className="mx-auto mb-4 size-10 text-[#71717A]" />
        <h2 className="mb-2 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <p className="text-sm text-[#A1A1AA]">{t("empty")}</p>
      </section>
    )
  }

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <button
          type="button"
          onClick={() => void loadMessages()}
          className="base-btn btn-secondary px-4 py-2 text-sm"
        >
          {t("refresh")}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {messages.map((item) => (
          <article
            key={item._id}
            className={cn(
              "rounded-xl border p-5",
              item.read
                ? "border-[#27272A] bg-[#0f0f11]"
                : "border-[#D0BCFF]/30 bg-[rgba(208,188,255,0.05)]"
            )}
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-[#fafafa]">{item.subject}</h3>
              {!item.read && (
                <span className="rounded-full bg-[rgba(208,188,255,0.12)] px-3 py-1 text-xs font-bold text-[#D0BCFF]">
                  {t("unread")}
                </span>
              )}
            </div>
            <p className="text-xs text-[#71717A]">
              {format(new Date(item.createdAt), "PPpp")}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#CBC3D7]">
              {item.message}
            </p>
            {!item.read && (
              <button
                type="button"
                disabled={actionId === item._id}
                onClick={() => void markAsRead(item._id)}
                className="base-btn btn-secondary mt-4 px-3 py-2 text-xs disabled:opacity-50"
              >
                {t("mark-read")}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
