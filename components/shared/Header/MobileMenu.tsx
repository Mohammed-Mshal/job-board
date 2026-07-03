'use client'
import { AnimatePresence,  SlideDown } from '@/components/motion';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store/global.store';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function MobileMenu() {
    const { menuState, setMenuState,menuItems } = useGlobalStore();
    const t = useTranslations('Menu');
  return (
    <AnimatePresence>     
        {
            menuState && (
                <SlideDown>
                    <div className={cn("mobile-menu", menuState && "active")}>
                        <button 
                            type="button" 
                            title="Close Menu"
                            onClick={() => setMenuState(false)}
                            className="mobile-menu-close-button p-2 cursor-pointer absolute top-4 right-4">
                            <X className="w-8 h-8 text-[#CBC3D7]" />
                        </button>
                        <ul className="mobile-menu-items">
                            {menuItems.map((item) => (
                                <li className="mobile-menu-item" key={item.href}>
                                    <Link href={item.href} className="mobile-menu-item-link">{t(item.label)}</Link>
                                </li>
                            ))}
                            <li className="mobile-menu-item flex items-center gap-4 pt-8">
                                <Link href="/signup" className="text-[#E7E0ED] hover:text-[#8b5cf6] transition-all duration-300 cursor-pointer px-4">
                                            {t('signup')}
                                </Link>
                                <Link href="/login" className="base-btn btn-primary px-6">
                                    {t('login')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </SlideDown>
            )
        }
    </AnimatePresence>
  )
}
