'use client'
import React from 'react'
import { motion } from 'motion/react'
import { slideUp } from '@/animations';
import Image from 'next/image';
import { useLocale } from 'next-intl';
export default function CustomTicker({listItems, title}: {listItems: string[], title: string}) {
  const locale= useLocale()
  return (
    <div className="custom-ticker xl:my-24 lg:my-12 my-6 flex flex-col items-center gap-6">
      <motion.div variants={slideUp} whileInView="animate" initial="initial" viewport={{ amount: 0.5 , once: true}}>
        <h2 className="title text-center text-lg uppercase tracking-[3.2px] text-[#71717A] font-bold">
          {title}
        </h2>
      </motion.div>
        <motion.div variants={slideUp} whileInView="animate" initial="initial" viewport={{ amount: 0.5 }} className="py-2 text-center flex justify-center">
            <motion.div 
              initial={{ x: locale === 'ar' ? '-150%' : '150%' }}
              animate={{ x: locale === 'ar' ? '150%' : '-150%' }}
              viewport={{ amount: 0.5 , once: true}}
              transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
              className="flex items-center justify-center gap-8 ">
                {listItems.map((item, index) => (
                    <div key={index} className="text-sm w-auto h-8 min-w-30">
                        <Image src={item} alt={item} width={100} height={100} className='w-full h-full object-contain' />
                    </div>
                ))}
            </motion.div>
        </motion.div>
    </div>
  )
}
