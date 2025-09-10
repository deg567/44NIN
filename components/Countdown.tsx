"use client"

import schedule from '@/content/schedule.json'
import { useEffect, useMemo, useState } from 'react'

type Item = {
  id: string
  date: string
  time: string
  title: string
  location?: string
}

function nextEvent(now = new Date()) {
  const items = (schedule as Item[])
    .map((it) => {
      const dt = new Date(`${it.date}T${it.time || '00:00'}:00`)
      return { ...it, when: dt }
    })
    .filter((it) => it.when.getTime() > now.getTime())
    .sort((a, b) => a.when.getTime() - b.when.getTime())
  return items[0]
}

export default function Countdown() {
  const target = useMemo(() => nextEvent() || null, [])
  const [remaining, setRemaining] = useState<number>(target ? target.when.getTime() - Date.now() : 0)

  useEffect(() => {
    if (!target) return
    const t = setInterval(() => setRemaining(target.when.getTime() - Date.now()), 1000)
    return () => clearInterval(t)
  }, [target])

  if (!target || remaining <= 0) return null

  const totalSec = Math.floor(remaining / 1000)
  const d = Math.floor(totalSec / 86400)
  const h = Math.floor((totalSec % 86400) / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60

  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-neutral-100 backdrop-blur">
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="font-semibold">다음 런</span>
      <span className="opacity-80">{target.title}</span>
      <span className="opacity-80">• {target.location || '집결 TBD'}</span>
      <span className="font-mono tabular-nums">{d}d {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}</span>
    </div>
  )
}

