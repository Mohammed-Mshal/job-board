import React from 'react'
import Image from 'next/image';
interface WhyChooseUsCardProps {
    image: string;
    title: string;
    description: string;
}
export default function WhyChooseUsCard({ image, title, description }: WhyChooseUsCardProps) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-start gap-4 p-8 bg-[#18181B] hover:bg-[rgba(73,68,84)] transition-all duration-300 rounded-3xl border border-[rgba(73,68,84,0.1)]">
        <div className="image-card w-full h-32 rounded-xl overflow-hidden">
            <Image src={image} alt={title} width={100} height={100} className="w-full h-full object-contain" />
        </div>
        <div className="content-card flex flex-col gap-3">
            <h3 className="title font-bold lg:text-2xl text-xl">{title}</h3>
            <p className="description text-[#A1A1AA] line-clamp-3">{description}</p>
        </div>
    </div>
  )
}
