import Image from 'next/image';
import React from 'react'

interface WorkItemProps {
  title: string;
  Icon: string;
  description?: string;
}
export default function WorkItem({ title, Icon, description }: WorkItemProps) {
  return (
    <div
        className={`
            value-card flex items-center text-center flex-col gap-4 transition-all duration-300
            rounded-2xl cursor-pointer
        `}
        tabIndex={0}
        role="group"
        aria-label={title}
    >
        <div className="value-card-icon flex size-20 items-center justify-center rounded-full border-4 border-[#8B5CF6] p-4">
            <Image src={Icon} alt={title} width={100} height={100} className="size-6 text-[#D0BCFF]" aria-hidden />
        </div>
        <h3 className="value-card-description lg:text-2xl text-xl font-bold">{title}</h3>
        <p className="value-card-title text-base text-[#A1A1AA]">{description}</p>
    </div>
  )
}
