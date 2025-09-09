import { NextResponse } from 'next/server'
import * as ical from 'node-ical'
import { z } from 'zod'
import { addWeeks, isAfter, isBefore, startOfToday } from 'date-fns'
import fallback from '@/content/schedule.json'

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
type ScheduleItem = z.infer<typeof ScheduleItemSchema>

function toISODate(d: Date) {
  // yyyy-mm-dd
  return d.toISOString().slice(0, 10)
}

async function fetchICS(url: string, weeks: number): Promise<ScheduleItem[]> {
  const events = await ical.async.fromURL(url)
  const today = startOfToday()
  const windowEnd = addWeeks(today, weeks)

  const items: ScheduleItem[] = Object.values(events)
    .filter((e: any) => e.type === 'VEVENT' && e.start)
    .map((e: any) => {
      const start: Date = e.start
      const title: string = e.summary || '러닝'
      const location: string | undefined = e.location
      const description: string | undefined = e.description
      // naive parse for distance/pace from description if formatted, optional
      let distance_km: number | undefined
      let pace: string | undefined
      if (typeof description === 'string') {
        const dist = description.match(/(\d+(?:\.\d+)?)\s?km/i)
        if (dist) distance_km = parseFloat(dist[1])
        const p = description.match(/(\d{1,2}:\d{2})\s*\/\s*km/i)
        if (p) pace = p[1] + '/km'
      }
      return {
        id: e.uid || `${toISODate(start)}-${title}`,
        date: toISODate(start),
        time: start.toTimeString().slice(0, 5),
        title,
        location,
        distance_km,
        pace,
        note: undefined,
        link: undefined,
      }
    })
    .filter((it) => {
      const d = new Date(it.date + 'T' + (it.time || '00:00'))
      return isAfter(d, today) && isBefore(d, windowEnd)
    })
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

  return items
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const weeks = Math.max(1, Math.min(12, Number(url.searchParams.get('weeks')) || 6))
    const limit = Math.min(50, Number(url.searchParams.get('limit')) || 0)

    const icalUrl = process.env.ICAL_URL
    let items: ScheduleItem[]

    if (icalUrl) {
      try {
        const all = await fetchICS(icalUrl, weeks)
        items = all
      } catch (e) {
        // Fallback to local JSON on failure
        const parsed = z.array(ScheduleItemSchema).safeParse(fallback)
        items = parsed.success ? parsed.data : []
      }
    } else {
      const parsed = z.array(ScheduleItemSchema).safeParse(fallback)
      items = parsed.success ? parsed.data : []
    }

    if (limit > 0) items = items.slice(0, limit)

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
