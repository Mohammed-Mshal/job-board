import React from 'react'

interface ValueCardProps {
  title: string;
  valueNumber: string;
  icon: React.ReactNode;
  wrapperIconColor?: string;
}
export default function ValueCard({ title, valueNumber, icon, wrapperIconColor }: ValueCardProps) {
  return (
    <div
        className={`
            value-card flex flex-col gap-2 transition-all duration-300 lg:p-10 md:p-6 p-4
            group
            border border-[rgba(73,68,84,0.1)] bg-[rgba(21,18,27,0.1)] rounded-2xl cursor-pointer
            hover:shadow-[0_0_25px_0_rgba(208,188,255,0.3)]
        `}
        tabIndex={0}
        role="group"
        aria-label={title}
    >
        <div className={`value-card-icon w-14 h-14 flex items-center justify-center rounded-2xl p-4 group-hover:scale-110 transition-all duration-300 ${wrapperIconColor}`}>
            {icon}
        </div>
        <h3 className="value-card-description 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-bold">{valueNumber}</h3>
        <p className="value-card-title text-base text-[#A1A1AA]">{title}</p>
    </div>
  )
}
