"use client"

import { userService } from "@/services/user.service"
import { useAuthStore } from "@/store/auth.store"
import { PublicUser } from "@/types/api.types"
import { Camera, Loader2 } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { AxiosError } from "axios"

interface ProfileAvatarProps {
  user: PublicUser
  onUpdated: () => void
}

export default function ProfileAvatar({ user, onUpdated }: ProfileAvatarProps) {
  const t = useTranslations("ProfilePage.avatar")
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fetchUser = useAuthStore((state) => state.fetchUser)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)) {
      toast.error(t("invalid-type"))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("invalid-size"))
      return
    }

    setIsUploading(true)
    try {
      const response = await userService.uploadProfileImage(file)
      await fetchUser()
      onUpdated()
      toast.success(response.message || t("success"))
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? ((error.response?.data?.error as string) ?? t("error"))
          : t("error")
      toast.error(message)
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="relative size-24 shrink-0">
      <div className="size-24 overflow-hidden rounded-full border-2 border-[#27272A] bg-[#27272A]">
        {user.profileImage?.url ? (
          <Image
            src={user.profileImage.url}
            alt={user.name}
            width={96}
            height={96}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-2xl font-bold text-[#D0BCFF]">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border border-[#27272A] bg-[#18181B] text-[#D0BCFF] transition-colors hover:bg-[#27272A] disabled:opacity-50"
        aria-label={t("change")}
      >
        {isUploading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Camera className="size-4" />
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={(event) => {
          void handleFileChange(event)
        }}
      />
    </div>
  )
}
