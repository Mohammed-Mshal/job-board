import SearchForm from '@/components/Forms/SearchForm';
import JobList from '@/components/JobList/JobList';
import FilterModal from '@/components/modals/FilterModal';
import { requirePageVisible } from '@/lib/getCmsContent';
import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('SEO');

  return buildPageMetadata({
    locale,
    path: '/jobs',
    title: t('jobs-title'),
    description: t('jobs-description'),
  });
}

export default async function JobsPage() {
  await requirePageVisible("jobs");

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
