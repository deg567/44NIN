"use client"

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import gallery from '@/content/gallery.json'

type Photo = {
  src: string
  alt: string
  eventId?: string
  tags?: string[]
}

export default function Gallery() {
  const items = gallery as Photo[]
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const close = useCallback(() => setOpen(false), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, prev, next])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {items.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            className="group aspect-square relative block overflow-hidden rounded bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-red"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            aria-label={`${p.alt} 확대 보기`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[11px] text-neutral-500">
              {/* 실제 이미지를 public/gallery 에 넣으면 아래 Image로 표시됩니다. */}
              <span className="group-hover:opacity-0 transition-opacity">{p.alt}</span>
            </div>
            {/* 썸네일 이미지가 준비되면 주석을 해제하세요. */}
            {/* <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" /> */}
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 group-hover:ring-brand-red/50" />
          </button>
        ))}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[index]?.src || ''}
              alt={items[index]?.alt || ''}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <button
              onClick={close}
              className="absolute top-2 right-2 rounded bg-black/60 px-3 py-1 text-white text-xs hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="닫기"
            >
              닫기
            </button>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-black/60 px-3 py-2 text-white text-xs hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="이전"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-black/60 px-3 py-2 text-white text-xs hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="다음"
            >
              →
            </button>
            <figcaption className="absolute bottom-2 left-2 right-2 text-center text-xs text-neutral-200">
              {items[index]?.alt}
            </figcaption>
          </div>
        </div>
      ) : null}
    </>
  )
}
