'use client'
import { useGlobalStore } from '@/store/global.store';
import { MenuIcon } from 'lucide-react';
import React from 'react'

export default function MenuButton() {
    const { setMenuState } = useGlobalStore();
  return (
    <button type="button" title="Menu" className="lg:hidden cursor-pointer" onClick={() => setMenuState(true)}>
        <MenuIcon className="w-6 h-6 text-[#E7E0ED]" />
    </button>
  )
}
