import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import './Header.css'
import Menu from './Menu';
import MenuButtons from './MenuButtons';
export default function Header() {
  return (
    <header className="header">
        <div className="header-container">
            <div className="flex items-center justify-between">
                <div className="wrapper-logo">
                  <Link href="/" className="logo-link">
                      <Image src="/jobify-logo.svg" alt="logo" width={40} height={40} className="logo-image" />
                  </Link>
                </div>
                <Menu />
                <MenuButtons />
            </div>
        </div>
    </header>
  )
}
