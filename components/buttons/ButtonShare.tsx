'use client'
import { Share } from 'lucide-react';
import React from 'react'

export default function ButtonShare({ jobTitle }: { jobTitle: string }) {
    const handleShare = () => {
        if (typeof window !== 'undefined' && window.navigator?.share) {
            window.navigator.share({
                title: document.title,
                text: jobTitle || '',
                url: window.location.href,
            });
        }
    }
  return (
    <button onClick={handleShare} className="cursor-pointer p-0 text-[#71717A] flex hover:text-[#fafafa] transition-all duration-300">
        <Share size={20} /> 
    </button>
  )
}
