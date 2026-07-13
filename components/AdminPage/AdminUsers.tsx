"use client"

import { adminService } from "@/services/admin.service"
import { PublicUser } from "@/types/api.types"
import { USER_ROLES } from "@/constants/roles"
import { USER_STATUS } from "@/constants/userStatus"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Loader2, Mail, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"
import { Input } from "../ui/input"
import AdminSendMessageModal from "./AdminSendMessageModal"

const roleStyles: Record<string, string> = {
  admin: "bg-[rgba(208,188,255,0.12)] text-[#D0BCFF]",
  company: "bg-[rgba(59,130,246,0.12)] text-[#60A5FA]",
  user: "bg-[rgba(113,113,122,0.12)] text-[#A1A1AA]",
}

const statusStyles: Record<string, string> = {
  active: "bg-[rgba(34,197,94,0.12)] text-[#4ADE80]",
  suspended: "bg-[rgba(239,68,68,0.12)] text-[#F87171]",
}

const selectClassName =
  "rounded-xl border border-[#27272A] bg-[#111113] px-3 py-2 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF]"

export default function AdminUsers() {
  const t = useTranslations("AdminPage.users")
  const [users, setUsers] = useState<PublicUser[]>([])
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [actionId, setActionId] = useState<string | null>(null)
  const [messageTarget, setMessageTarget] = useState<PublicUser | null>(null)

  const loadUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await adminService.getUsers({
        search: search.trim() || undefined,
        role: roleFilter,
        status: statusFilter,
        page,
        limit: 10,
      })
      setUsers(data.users)
      setTotalPages(data.totalPages)
      setTotal(data.total)
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("load-error")))
    } finally {
      setIsLoading(false)
    }
  }, [page, roleFilter, search, statusFilter, t])

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadUsers()
    }, search ? 300 : 0)

    return () => clearTimeout(timer)
  }, [loadUsers, search])

  const updateUser = async (
    userId: string,
    updates: { role?: PublicUser["role"]; status?: PublicUser["status"] }
  ) => {
    setActionId(userId)
    try {
      const response = await adminService.updateUser(userId, updates)
      setUsers((prev) =>
        prev.map((item) => (item.userId === userId ? response.user : item))
      )
      toast.success(response.message || t("updated"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("update-error")))
    } finally {
      setActionId(null)
    }
  }

  return (
    <>
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
          <p className="mt-1 text-sm text-[#71717A]">
            {t("total", { count: total })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadUsers()}
          className="base-btn btn-secondary px-4 py-2 text-sm"
        >
          {t("refresh")}
        </button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#71717A]" />
          <Input
            value={search}
            onChange={(event) => {
              setPage(1)
              setSearch(event.target.value)
            }}
            placeholder={t("search-placeholder")}
            className="pl-10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(event) => {
            setPage(1)
            setRoleFilter(event.target.value)
          }}
          className={selectClassName}
          aria-label={t("filter-role")}
        >
          <option value="all">{t("roles.all")}</option>
          <option value={USER_ROLES.USER}>{t("roles.user")}</option>
          <option value={USER_ROLES.COMPANY}>{t("roles.company")}</option>
          <option value={USER_ROLES.ADMIN}>{t("roles.admin")}</option>
        </select>
        <select
          value={statusFilter}
          onChange={(event) => {
            setPage(1)
            setStatusFilter(event.target.value)
          }}
          className={selectClassName}
          aria-label={t("filter-status")}
        >
          <option value="all">{t("statuses.all")}</option>
          <option value={USER_STATUS.ACTIVE}>{t("statuses.active")}</option>
          <option value={USER_STATUS.SUSPENDED}>{t("statuses.suspended")}</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex min-h-[240px] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-[#D0BCFF]" />
        </div>
      ) : users.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#A1A1AA]">{t("empty")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {users.map((user) => {
            const status = user.status ?? USER_STATUS.ACTIVE
            const isBusy = actionId === user.userId

            return (
              <article
                key={user.userId}
                className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-[#fafafa]">{user.name}</h3>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold capitalize",
                          roleStyles[user.role]
                        )}
                      >
                        {t(`roles.${user.role}`)}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold capitalize",
                          statusStyles[status]
                        )}
                      >
                        {t(`statuses.${status}`)}
                      </span>
                    </div>
                    <p className="text-sm text-[#A1A1AA]">{user.email}</p>
                    <p className="mt-1 text-xs text-[#71717A]">
                      {user.location} · {format(new Date(user.createdAt), "PP")}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={user.role}
                      disabled={isBusy}
                      onChange={(event) =>
                        void updateUser(user.userId, {
                          role: event.target.value as PublicUser["role"],
                        })
                      }
                      className={cn(selectClassName, "disabled:opacity-50")}
                      aria-label={t("change-role")}
                    >
                      <option value={USER_ROLES.USER}>{t("roles.user")}</option>
                      <option value={USER_ROLES.COMPANY}>{t("roles.company")}</option>
                      <option value={USER_ROLES.ADMIN}>{t("roles.admin")}</option>
                    </select>

                    {status === USER_STATUS.ACTIVE ? (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() =>
                          void updateUser(user.userId, { status: USER_STATUS.SUSPENDED })
                        }
                        className="base-btn btn-secondary px-3 py-2 text-xs disabled:opacity-50"
                      >
                        {t("suspend")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() =>
                          void updateUser(user.userId, { status: USER_STATUS.ACTIVE })
                        }
                        className="base-btn btn-primary px-3 py-2 text-xs disabled:opacity-50"
                      >
                        {t("activate")}
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => setMessageTarget(user)}
                      className="base-btn btn-secondary flex items-center gap-1.5 px-3 py-2 text-xs disabled:opacity-50"
                    >
                      <Mail className="size-3.5" />
                      {t("send-message")}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1 || isLoading}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="base-btn btn-secondary px-4 py-2 text-sm disabled:opacity-50"
          >
            {t("previous")}
          </button>
          <span className="text-sm text-[#A1A1AA]">
            {t("page", { current: page, total: totalPages })}
          </span>
          <button
            type="button"
            disabled={page >= totalPages || isLoading}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="base-btn btn-secondary px-4 py-2 text-sm disabled:opacity-50"
          >
            {t("next")}
          </button>
        </div>
      )}
    </section>

    {messageTarget && (
      <AdminSendMessageModal
        open={Boolean(messageTarget)}
        userId={messageTarget.userId}
        userName={messageTarget.name}
        onClose={() => setMessageTarget(null)}
      />
    )}
  </>
  )
}
