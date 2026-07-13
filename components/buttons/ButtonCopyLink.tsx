'use client'
import { Copy } from 'lucide-react';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
  
export default function ButtonCopyLink() {
    const t = useTranslations();
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success(t('buttonCopyLink'));
    }
  return (
    <button onClick={handleShare} className="cursor-pointer p-0 text-[#71717A] flex hover:text-[#fafafa] transition-all duration-300">
        <Copy size={20} /> 
    </button>
  )
}
