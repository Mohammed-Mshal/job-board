import CompanySearchForm from "@/components/Forms/CompanySearchForm"
import CompanyList from "@/components/CompanyList/CompanyList"

export default function CompaniesPage() {
  return (
    <div className="companies-page">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-2 xl:max-w-7xl">
        <div className="base-filter flex justify-center">
          <CompanySearchForm />
        </div>
        <CompanyList />
      </div>
    </div>
  )
}
