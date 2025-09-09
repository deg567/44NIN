import { NextResponse } from 'next/server'

export const runtime = 'edge'

type WeatherResult = {
  tempC: number | null
  condition: string | null
  code: number | null
  aqiGrade: 'good' | 'fair' | 'caution' | null
  updatedAt: string
}

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

function gradeFromCode(code: number): 'good' | 'fair' | 'caution' {
  if ([0, 1, 2].includes(code)) return 'good'
  if ([65, 75, 82, 95, 96, 99, 81].includes(code)) return 'caution'
  return 'fair'
}

export async function GET() {
  const lat = Number(process.env.WEATHER_LAT || 37.5665)
  const lng = Number(process.env.WEATHER_LNG || 126.9780)

  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', String(lat))
    url.searchParams.set('longitude', String(lng))
    url.searchParams.set('current', 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m')
    url.searchParams.set('timezone', 'auto')

    const res = await fetch(url.toString(), { next: { revalidate: 1800 } })
    if (!res.ok) throw new Error('weather_failed')
    const data = await res.json()
    const cur = data.current as any
    const code: number | null = typeof cur?.weather_code === 'number' ? cur.weather_code : null
    const tempC: number | null = typeof cur?.temperature_2m === 'number' ? cur.temperature_2m : null
    const condition = code != null ? CODE_TEXT[code] ?? null : null
    const aqiGrade = code != null ? gradeFromCode(code) : null
    const result: WeatherResult = {
      tempC,
      condition,
      code,
      aqiGrade,
      updatedAt: new Date().toISOString(),
    }
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=1800, stale-while-revalidate=86400',
      },
    })
  } catch (e) {
    const result: WeatherResult = {
      tempC: null,
      condition: null,
      code: null,
      aqiGrade: null,
      updatedAt: new Date().toISOString(),
    }
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate=3600',
      },
    })
  }
}

