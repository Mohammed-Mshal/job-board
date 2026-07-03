import SearchForm from '@/components/Forms/SearchForm';
import JobList from '@/components/JobList/JobList';
import FilterModal from '@/components/modals/FilterModal';
import React from 'react'

export default function JobsPage() {
  return (
    <div className="jobs-page">
      <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex gap-4 flex-col">
        <div className="base-filter flex justify-center">
          <SearchForm/>
        </div>
        <JobList/>
      </div>
      <FilterModal/>
    </div>
  )
}
