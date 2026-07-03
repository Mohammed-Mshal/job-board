'use client'
import { usePathname, useRouter } from '@/i18n/navigation';
import { useGlobalStore } from '@/store/global.store';
import { GlobeIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

export default function LanguageButton() {
    const { changeLocale } = useGlobalStore();
    const pathname = usePathname();
    const t = useTranslations('Menu');
    const locale = useLocale()
    const router= useRouter()
    const toggleLanguage = ()=>{
        const newLocale = locale === 'ar' ? 'en' : 'ar'
        changeLocale(newLocale)
        router.replace( {pathname}, { locale: newLocale })
    }
    return (
        <button title="Change Language" 
        type={'button'}
        onClick={toggleLanguage}
        className="btn-language">
            <GlobeIcon className="w-4 h-4" />
            {locale === 'ar' ? t('en') : t('ar')}
        </button>
        
    )
}
