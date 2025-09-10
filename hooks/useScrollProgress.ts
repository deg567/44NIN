"use client"

import { useEffect, useRef, useState } from 'react'

export default function useScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight || document.documentElement.clientHeight
      const total = rect.height - viewH
      const passed = Math.min(total, Math.max(0, -rect.top))
      const p = total > 0 ? passed / total : 0
      setProgress(reduce ? 0 : Math.max(0, Math.min(1, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { ref, progress }
}

