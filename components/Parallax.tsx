"use client"

import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  /** 양수일수록 더 많이 이동 (기본 0.12) */
  speed?: number
  /** 최대 이동(px) 클램프 (기본 80) */
  max?: number
}

export default function Parallax({ children, className = '', speed = 0.12, max = 80 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [y, setY] = useState(0)

  useEffect(() => {
    // 접근성: 모션 최소화 환경에서는 비활성화
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const sy = window.scrollY || window.pageYOffset || 0
        const v = Math.max(-max, Math.min(max, sy * speed))
        setY(v)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [speed, max])

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0, ${y.toFixed(1)}px, 0)`, willChange: 'transform' }}
      aria-hidden
    >
      {children}
    </div>
  )
}

