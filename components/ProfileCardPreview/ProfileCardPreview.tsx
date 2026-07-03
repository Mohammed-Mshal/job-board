'use client'
import { Briefcase } from 'lucide-react';
import React from 'react'
import './ProfileCardPreview.css';
import { motion } from 'framer-motion';
export default function ProfileCardPreview() {
    
    return (
        <div className="card-container relative overflow-hidden">
            <div className="header-card flex items-center gap-2 ">
                {/* Animated Icon */}
                <motion.div
                    className="icon w-12 h-12 rounded-full bg-[#6D28D9] flex items-center justify-center"
                    initial={{ scale: 1, rotate: 0 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 7, -7, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <Briefcase className="w-5 h-5" />
                </motion.div>
                <div className="content flex flex-col gap-2">
                    {/* Shimmering Title */}
                    <motion.span
                        className="bg-[#27272A] p-2 w-32 rounded-sm"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    ></motion.span>
                    <motion.span
                        className="bg-[#27272A] p-1.5 w-20 opacity-60 rounded-sm"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut", delay: 0.2 }}
                    ></motion.span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {/* Animated skeleton lines */}
                <motion.span
                    className="bg-[#27272A] p-1 w-full rounded-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.15 }}
                ></motion.span>
                <motion.span
                    className="bg-[#27272A] p-1 w-[80%] rounded-sm"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                ></motion.span>
                <motion.span
                    className="bg-[#27272A] p-1 w-[60%] rounded-sm"
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut", delay: 0.7 }}
                ></motion.span>
            </div>
            <div className="flex justify-between items-center gap-4">
                {/* Animated footer circles */}
                <div className="flex">
                    <motion.span
                        className="footer-circle bg-[#2C2832]"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    ></motion.span>
                    <motion.span
                        className="footer-circle bg-[#1D1A23]"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.2 }}
                    ></motion.span>
                    <motion.span
                        className="footer-circle bg-[#A078FF]"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.4 }}
                    ></motion.span>
                </div>
                {/* Animated ghost button */}
                <motion.div
                    className="flex rounded-lg bg-[rgba(208,188,255,0.2)] border border-[rgba(208,188,255,0.3)] p-4 w-24"
                    animate={{ boxShadow: ["0 0 0 rgba(186,163,255,0.12)", "0 0 16px 4px rgba(186,163,255,0.16)", "0 0 0 rgba(186,163,255,0.12)"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.3,
                        ease: "easeInOut"
                    }}
                ></motion.div>
            </div>
        </div>
   
    )
}
