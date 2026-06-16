'use client'
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { globalStore } from '@/store/global.store';
import React from 'react'

export default function Menu() {
    const { menuState, setMenuState, menuItems } = globalStore();
    const t = useTranslations('Menu');
    return (
        <div className="menu">
            <ul className="menu-items">
                    {menuItems.map((item) => (
                        <li className="menu-item" key={item.href}>
                            <Link href={item.href} className="menu-item-link">{t(item.label)}</Link>
                        </li>
                    ))}
            </ul> 
        </div>
    )
}
