'use client'
import LanguageButton from '@/components/buttons/LanguageButton';
import MenuButton from '@/components/buttons/MenuButton';
import { USER_ROLES } from '@/constants/roles';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/src/store/auth.store';
import { LayoutDashboard, Plus, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function MenuButtons() {
    const user = useAuthStore((state)=>state.user);
    const isAuthenticated = useAuthStore((state)=>state.isAuthenticated);
    const t = useTranslations('Menu');    
    if (!user || !isAuthenticated) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/signup" className="hidden sm:block text-[#E7E0ED] hover:text-[#8b5cf6] transition-all duration-300 cursor-pointer">
                    {t('signup')}
                </Link>
                <Link href="/login" className="hidden sm:block base-btn btn-primary">
                    {t('login')}
                </Link>
                <LanguageButton/>
                <MenuButton/>
            </div>
        )
    }
  return (
    <div className='flex items-center gap-4'>
        {user.role === USER_ROLES.ADMIN && (
          <Link href="/admin" className="base-btn btn-secondary  h-8 w-8 sm:w-fit sm:h-fit gap-2 p-2 text-sm flex items-center rounded-full sm:rounded-lg sm:py-1" title={t('admin')}>
            <LayoutDashboard className="w-full h-full sm:size-4" />
            <span className="hidden sm:inline-flex">
            {t('admin')}
            </span>
          </Link>
        )}
        {user.role === USER_ROLES.COMPANY && (
          <Link href="/post-job" className="base-btn btn-primary h-8 w-8 sm:w-fit sm:h-fit gap-2 p-2 text-sm flex items-center rounded-full sm:rounded-lg sm:py-1" title={t('post-job')}>
            <Plus className="w-full h-full sm:size-4" />
            <span className="hidden sm:inline-flex">
              {t('post-job')}
            </span>
          </Link>
        )}
        <Link href="/profile" className="base-btn btn-secondary w-8 h-8 p-2 rounded-full">
            <UserIcon className="w-full h-full" />
        </Link>
        <LanguageButton/>
        <MenuButton/>
    </div>
  )
}
