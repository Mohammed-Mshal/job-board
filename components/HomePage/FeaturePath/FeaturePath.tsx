import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import React from 'react'
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import FeaturePathSwiper from './FeaturePathSwiper';
import { SlideUp } from '@/components/motion';
import { IJob, JobStatus } from '@/types/job.types';
import { HomeSectionTitleCms } from '@/types/cms.types';
import { jobService } from '@/src/services';

export default async function FeaturePath({
  sectionContent,
}: {
  sectionContent?: HomeSectionTitleCms
}) {
  const t = await getTranslations('FeaturePath');

  let jobs: IJob[] = [];
  try {
    const response = await jobService.getJobs({
      status: JobStatus.OPEN,
      limit: 9,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    jobs = response.jobs;
  } catch {
    jobs = [];
  }

  return (
    <div className="feature-path">
      <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex flex-col items-center justify-center gap-12">
        <div className="feature-path-content flex items-center justify-between gap-4 w-full">
        <HeaderSection title={sectionContent?.title ?? t('title')} description={sectionContent?.description ?? t('description')} headerDirection="left" />
        <SlideUp
        whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <Link href="/jobs" className="base-btn btn-primary text-nowrap">
            {sectionContent?.cta ?? t('cta')}
          </Link>
        </SlideUp>
        </div>
        <FeaturePathSwiper jobs={jobs} />
      </div>
    </div>
  )
}
