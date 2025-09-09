import * as ical from 'node-ical'
import { z } from 'zod'
import { addWeeks, isAfter, isBefore, startOfToday } from 'date-fns'
import fallback from '@/content/schedule.json'
import type { ScheduleItem as ItemType } from '@/lib/types'

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

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10)
}

async function fromICS(url: string, weeks: number): Promise<ItemType[]> {
  const events = await ical.async.fromURL(url)
  const today = startOfToday()
  const windowEnd = addWeeks(today, weeks)

  const items: ItemType[] = Object.values(events)
    .filter((e: any) => e.type === 'VEVENT' && e.start)
    .map((e: any) => {
      const start: Date = e.start
      const title: string = e.summary || '러닝'
      const location: string | undefined = e.location
      const description: string | undefined = e.description
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

export async function getSchedule({ weeks = 6, limit = 0 }: { weeks?: number; limit?: number }) {
  const icalUrl = process.env.ICAL_URL
  let items: ItemType[]
  if (icalUrl) {
    try {
      items = await fromICS(icalUrl, weeks)
    } catch (e) {
      const parsed = z.array(ScheduleItemSchema).safeParse(fallback)
      items = parsed.success ? (parsed.data as ItemType[]) : []
    }
  } else {
    const parsed = z.array(ScheduleItemSchema).safeParse(fallback)
    items = parsed.success ? (parsed.data as ItemType[]) : []
  }

  if (limit && limit > 0) items = items.slice(0, limit)
  return items
}

