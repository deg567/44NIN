"use client"

import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all header-shell ${scrolled ? 'header-scrolled' : ''}`}>
      <nav className="container flex items-center justify-between py-3">
        <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`} className="font-bold tracking-tight text-white">
          44NIN RUNNERS
        </a>
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#schedule" className="link-nav">스케줄</a>
          <a href="#courses" className="link-nav">코스</a>
          <a href="#gallery" className="link-nav">갤러리</a>
          <a href="#join" className="link-cta">함께 뛰기</a>
        </div>
      </nav>
    </header>
  )
}

