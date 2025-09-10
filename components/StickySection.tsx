"use client"

import useScrollProgress from '@/hooks/useScrollProgress'

type Props = {
  id?: string
  height?: number // in viewport heights
  topOffset?: number // px
  render: (p: number) => React.ReactNode
}

export default function StickySection({ id, height = 250, topOffset = 56, render }: Props) {
  const { ref, progress } = useScrollProgress()
  const minH = `${height}vh`
  return (
    <section id={id} ref={ref} style={{ minHeight: minH }} className="sticky-section">
      <div className="sticky-inner" style={{ top: topOffset }}>
        {render(progress)}
      </div>
    </section>
  )
}

