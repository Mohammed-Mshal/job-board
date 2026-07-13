"use client"

import { useCompaniesStore } from "@/src/store/companies.store"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { Input } from "../ui/input"

export default function CompanySearchForm() {
  const search = useCompaniesStore((state) => state.search)
  const location = useCompaniesStore((state) => state.location)
  const setSearch = useCompaniesStore((state) => state.setSearch)
  const setLocation = useCompaniesStore((state) => state.setLocation)
  const fetchCompanies = useCompaniesStore((state) => state.fetchCompanies)
  const t = useTranslations("forms")

  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchCompanies()
    }, 500)

    return () => clearTimeout(timeout)
  }, [fetchCompanies, search, location])

  return (
    <form
      className="my-6 flex max-w-4xl flex-1 gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="form-group flex w-full overflow-hidden rounded-full bg-[#111113] px-8 py-4">
        <Input
          className="border-none bg-none"
          placeholder={t("search")}
          value={search ?? ""}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Input
          className="border-none bg-none"
          placeholder={t("city")}
          value={location ?? ""}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
    </form>
  )
}
