'use client'
import { globalStore } from '@/store/global.store';
import { MenuIcon } from 'lucide-react';
import React from 'react'

export default function MenuButton() {
    const { setMenuState } = globalStore();
  return (
    <button type="button" title="Menu" className="lg:hidden cursor-pointer" onClick={() => setMenuState(true)}>
        <MenuIcon className="w-6 h-6 text-[#E7E0ED]" />
    </button>
  )
}
