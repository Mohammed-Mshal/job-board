import React from 'react'
import SignupForm from '@/components/Forms/SignupForm';
import { Link } from '@/i18n/navigation';
import './signup.css';
export default function SignupPage() {
  return (
    <div className="pt-12 login-page z-10 ">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex gap-4 flex-col">
            <div className="header-section flex items-center flex-col text-center">
                <h2 className="xl:text-3xl lg:text-2xl text-xl font-bold text-[#D0BCFF]">
                    Create your account
                </h2>
                <div className="desc lg:text-lg text-base text-[#A1A1AA]">
                    Join the high-performance network of top companies and candidates.
                </div>
            </div>
            <div className="max-w-4xl mx-auto w-full p-8">
                <SignupForm />
                <hr className="my-8 border-t border-[#27272A]" />
                <div className="flex justify-center gap-1">
                    <p className="text-[#A1A1AA] text-sm">Already have an account?</p>
                    <Link href="/login" className="text-[#D0BCFF] text-sm font-bold">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
