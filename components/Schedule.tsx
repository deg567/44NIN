import type { ScheduleItem } from '@/lib/types'
import fallback from '@/content/schedule.json'

// Static-export friendly Schedule: uses local JSON only.
export default function Schedule() {
  const items: ScheduleItem[] = (fallback as ScheduleItem[]).slice(0, 6)
  const icalUrl = process.env.NEXT_PUBLIC_ICAL_URL

  if (!items.length) {
    return (
      <div className="rounded border p-6 text-sm text-neutral-700">
        예정된 공개 일정이 없습니다. 최신 공지는 상단 합류/공지 채널을 확인해 주세요.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-neutral-200">
        {items.map((ev) => (
          <li key={ev.id} className="py-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{ev.title}</div>
              <div className="text-sm text-neutral-600">
                {ev.date} • {ev.time} • {ev.location}
              </div>
              <div className="text-sm text-neutral-600">
                {ev.distance_km ? `${ev.distance_km}km` : null}
                {ev.pace ? ` · 페이스 ${ev.pace}` : null}
                {ev.note ? ` · ${ev.note}` : null}
              </div>
            </div>
            {ev.link ? (
              <a
                className="text-sm text-brand-red hover:underline shrink-0"
                href={ev.link}
                target="_blank"
                rel="noreferrer"
              >
                자세히
              </a>
            ) : null}
          </li>
        ))}
      </ul>

      {icalUrl ? (
        <div className="flex items-center gap-3 text-sm">
          <a className="text-brand-red hover:underline" href={icalUrl}>
            iCal 구독
          </a>
          <span className="text-neutral-400">|</span>
          <a className="text-neutral-700 hover:underline" href={icalUrl.replace(/^https?:\/\//, 'webcal://')}>
            Outlook/캘린더 추가
          </a>
        </div>
      ) : null}
    </div>
  )
}
