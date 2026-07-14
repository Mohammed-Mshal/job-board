import React, { Suspense } from 'react'
import { SearchCode } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import './login.css'
import ProfileCardPreview from '@/components/ProfileCardPreview/ProfileCardPreview';
import LoginForm from '@/components/Forms/LoginForm';
import { Link } from '@/i18n/navigation';
import { noIndexMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Login');
  return noIndexMetadata(locale, '/login', t('title'));
}

export default async function login() {
  const t = await getTranslations('Login');
  return (
    <div className="login-page relative z-10 pt-12">
      <div className="page-container flex flex-col gap-12 py-2 md:flex-row">
        <div className="relative hidden w-1/2 flex-col gap-10 md:flex">
          <div className="flex flex-col items-start gap-6">
            <div className="badge-subtitle gap-2">
              <SearchCode size={16} />
              <span>{t('subtitle')}</span>
            </div>
            <h1 className="auth-title">
              {t('title')}
            </h1>
            <p className="auth-description">
              {t('description')}
            </p>
          </div>
          <ProfileCardPreview/>
        </div>
        <div className="auth-panel">
          <Suspense>
            <LoginForm/>
          </Suspense>
          <hr className="form-divider" />
          <div className="form-footer">
            <p className="text-body-sm">{t('dont-have-an-account')}</p>
            <Link href="/signup" className="text-link">
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
