"use client"

import { useEffect, useState } from 'react'

type Weather = {
  tempC: number | null
  condition: string | null
  aqiGrade: 'good' | 'fair' | 'caution' | null
}

const dot = (grade: Weather['aqiGrade']) => {
  switch (grade) {
    case 'good':
      return 'bg-green-500'
    case 'fair':
      return 'bg-yellow-500'
    case 'caution':
      return 'bg-red-500'
    default:
      return 'bg-neutral-400'
  }
}

export default function WeatherBadge() {
  const [data, setData] = useState<Weather | null>(null)
  useEffect(() => {
    let mounted = true
    fetch('/api/weather')
      .then((r) => r.json())
      .then((j) => {
        if (mounted) setData({ tempC: j.tempC ?? null, condition: j.condition ?? null, aqiGrade: j.aqiGrade ?? null })
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const grade: Weather['aqiGrade'] = data?.aqiGrade ?? null
  const temp = data?.tempC
  const cond = data?.condition

  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-700">
      <span className={`h-2.5 w-2.5 rounded-full ${dot(grade)}`} />
      {cond ? cond : '날씨'}{typeof temp === 'number' ? ` · ${Math.round(temp)}°C` : ''}
    </span>
  )
}
