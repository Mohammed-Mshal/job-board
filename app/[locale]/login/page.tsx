import React from 'react'
import { SearchCode } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import './login.css'
import ProfileCardPreview from '@/components/ProfileCardPreview/ProfileCardPreview';
import LoginForm from '@/components/Forms/LoginForm';
import { Link } from '@/i18n/navigation';
export default async function login() {
  const t = await getTranslations('Login');
  return (
    <div className="pt-12 login-page z-10 ">
      <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex gap-12">
        <div className="left-side w-1/2 flex flex-col gap-10 relative">
          <div className="flex flex-col items-start gap-6">
            <div className="subtitle flex items-center gap-2 bg-[rgba(208,188,255,0.1)] border border-[rgba(208,188,255,0.2)] text-[#D0BCFF] uppercase tracking-wider py-1 px-4 rounded-full">
              <SearchCode/>
              <span className="text-xs font-bold">
                {t('subtitle')}
              </span>
            </div>
            <h2 className="leading-tight text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-balance">
              {t('title')}
            </h2>
            <p className="text-[#A1A1AA] lg:text-lg text-base">
              {t('description')}
            </p>
          </div>
          <ProfileCardPreview/>

        </div>
        <div className="right-side w-1/2 flex flex-col gap-3 justify-center p-8">
          <LoginForm/>
          <hr className="my-8 border-t border-[#27272A]"/>
          <div className="flex justify-center gap-1">
            <p className="text-[#A1A1AA] text-sm">
              {t('dont-have-an-account')}
            </p>
            <Link href="/register" className="text-[#D0BCFF] text-sm font-bold">
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
