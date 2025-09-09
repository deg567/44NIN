import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSchedule } from '@/lib/schedule'

export const runtime = 'nodejs'

const ScheduleItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string(),
  title: z.string(),
  location: z.string().optional(),
  pace: z.string().optional(),
  distance_km: z.number().optional(),
  note: z.string().optional(),
  link: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const weeks = Math.max(1, Math.min(12, Number(url.searchParams.get('weeks')) || 6))
    const limit = Math.min(50, Number(url.searchParams.get('limit')) || 0)

    const items = await getSchedule({ weeks, limit })

    return NextResponse.json(
      { items, weeks, count: items.length },
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
      },
    )
  } catch (err) {
    return NextResponse.json(
      { items: [], error: 'schedule_unavailable' },
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate=3600',
        },
      },
    )
  }
}
