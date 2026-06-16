'use client'
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { globalStore } from '@/store/global.store';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function MobileMenu() {
    const { menuState, setMenuState,menuItems } = globalStore();
    const t = useTranslations('Menu');
  return (
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
        </ul>
    </div>
  )
}
