"use client"

import { ROUTES } from "@/routes"
import {
  isNavigationVisible,
  isPageVisible,
  NAV_ROUTE_ID_TO_KEY,
} from "@/features/cms/cms.visibility"
import { SiteVisibilitySettings } from "@/types/cms.types"
import { useGlobalStore } from "@/store/global.store"
import { useEffect } from "react"

export default function SiteVisibilityProvider({
  visibility,
  children,
}: {
  visibility: SiteVisibilitySettings
  children: React.ReactNode
}) {
  const setMenuItems = useGlobalStore((state) => state.setMenuItems)

  useEffect(() => {
    const filteredRoutes = ROUTES.filter((route) => {
      const navKey = NAV_ROUTE_ID_TO_KEY[route.id]
      if (!navKey) return true

      if (!isNavigationVisible(visibility, navKey)) {
        return false
      }

      if (navKey === "home") {
        return true
      }

      return isPageVisible(visibility, navKey === "about" ? "about" : navKey === "contact" ? "contact" : navKey)
    })

    setMenuItems(filteredRoutes)
  }, [visibility, setMenuItems])

  return <>{children}</>
}
