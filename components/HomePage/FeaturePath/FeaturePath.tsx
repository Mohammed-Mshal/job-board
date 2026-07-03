import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import React from 'react'
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import FeaturePathSwiper from './FeaturePathSwiper';
import { SlideUp } from '@/components/motion';
import { IJob, JobStatus } from '@/types/job.types';
import { USER_ROLES } from '@/constants/roles';

export default async function FeaturePath() {
  const t = await getTranslations('FeaturePath');
  const jobs : IJob[] = [
    {
      _id: '1',
      title: 'Software Engineer',
      description: 'We are looking for a software engineer with 3 years of experience in React and Node.js.',
      company: {
        _id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        profileImage:{
          _id:'image-1',
          url:'https://placehold.co/600x400/png?text=J',
          altText:'John Doe',
          mediaId:'image-1',
          mimeType:'image/jpeg',
          size:100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        role: USER_ROLES.COMPANY,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      location: 'New York',
      salary: {
        min: 100000,
        max: 150000,
      },
      requirements: ['React', 'Node.js', 'JavaScript'],
      status: JobStatus.OPEN,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  return (
    <div className="feature-path">
      <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex flex-col items-center justify-center gap-12">
        <div className="feature-path-content flex items-center justify-between gap-4 w-full">
        <HeaderSection title={t('title')} description={t('description')} headerDirection="left" />
        <SlideUp
        whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <Link href="/jobs" className="base-btn btn-primary text-nowrap">
            {t('cta')}
          </Link>
        </SlideUp>
        </div>
        <FeaturePathSwiper jobs={jobs} />
      </div>
    </div>
  )
}
