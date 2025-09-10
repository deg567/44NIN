"use client"

import Image from 'next/image'

type Props = {
  frames: string[]
  progress: number // 0..1
}

export default function ScrollSequence({ frames, progress }: Props) {
  const n = Math.max(1, frames.length)
  const idx = Math.min(n - 1, Math.max(0, Math.floor(progress * (n - 1))))
  const src = frames[idx]
  return (
    <div className="absolute inset-0">
      <Image src={src} alt="sequence" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  )
}

