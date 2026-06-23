'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function VideoSection() {
  return (
    <div className="relative z-10 px-4"> 
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5,once: true }}
        transition={{  duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0]}}
        className="container max-w-3xl mx-auto bg-white/5 rounded-2xl backdrop-blur-lg w-full py-6 px-4">
          <div className="video-wrapper relative z-10">
            <div className="absolute pointer-events-none -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#D0BCFF]/10 -z-20 animate-pulse blur-xl transition-all duration-200"></div>
            <div className="absolute pointer-events-none inset-0 bg-black/40 rounded-2xl z-10 mix-blend-saturation"></div>
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
              <video
                className="w-full h-full object-cover rounded-2xl transition-opacity duration-700 group-hover:opacity-80 opacity-60"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Promotional video"
                tabIndex={0}
                poster="/banner-video-poster.jpg"
              >
                <source src="/banner-video.mp4" type="video/mp4" />
                <track
                  kind="captions"
                  srcLang="en"
                  label="English"
                  src="/banner-video.vtt"
                  default
                />
                Sorry, your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none">
                <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden="true" fill="white" className="drop-shadow-lg">
                  <circle cx="28" cy="28" r="28" fill="#000" fillOpacity="0.3"/>
                  <polygon points="23,18 41,28 23,38" fill="#fff"/>
                </svg>
              </div>
            </div>
  
          </div>
      </motion.div>
    </div>
  );
}
