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
    const lat = Number(process.env.NEXT_PUBLIC_WEATHER_LAT || 37.5665)
    const lng = Number(process.env.NEXT_PUBLIC_WEATHER_LNG || 126.9780)
    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', String(lat))
    url.searchParams.set('longitude', String(lng))
    url.searchParams.set('current', 'temperature_2m,weather_code')
    url.searchParams.set('timezone', 'auto')
    fetch(url.toString())
      .then((r) => r.json())
      .then((j) => {
        const cur = j?.current || {}
        const code: number | null = typeof cur.weather_code === 'number' ? cur.weather_code : null
        const tempC: number | null = typeof cur.temperature_2m === 'number' ? cur.temperature_2m : null
        const CODE_TEXT: Record<number, string> = {
          0: '맑음',
          1: '대체로 맑음',
          2: '부분 흐림',
          3: '흐림',
          45: '안개',
          48: '빙무',
          51: '이슬비 약',
          53: '이슬비 중',
          55: '이슬비 강',
          61: '비 약',
          63: '비 중',
          65: '비 강',
          71: '눈 약',
          73: '눈 중',
          75: '눈 강',
          80: '소나기 약',
          81: '소나기 중',
          82: '소나기 강',
          95: '뇌우',
          96: '뇌우(우박)',
          99: '뇌우(강한 우박)',
        }
        const gradeFromCode = (c: number): 'good' | 'fair' | 'caution' => {
          if ([0, 1, 2].includes(c)) return 'good'
          if ([65, 75, 82, 95, 96, 99, 81].includes(c)) return 'caution'
          return 'fair'
        }
        const condition = code != null ? CODE_TEXT[code] ?? null : null
        const aqiGrade = code != null ? gradeFromCode(code) : null
        if (mounted) setData({ tempC, condition, aqiGrade })
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
