'use client'
import LanguageButton from '@/components/buttons/LanguageButton';
import MenuButton from '@/components/buttons/MenuButton';
import { Link } from '@/i18n/navigation';
import { globalStore } from '@/store/global.store';
import { UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function MenuButtons() {
    const { user } = globalStore();
    const t = useTranslations('Menu');
    if (!user) {
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
        <Link href="/profile" className="base-btn btn-secondary">
            <UserIcon className="w-4 h-4" />
        </Link>
        <LanguageButton/>
        <MenuButton/>
    </div>
  )
}
