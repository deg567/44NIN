import schedule from '@/content/schedule.json'

type Item = {
  id: string
  date: string
  time: string
  title: string
  location?: string
  pace?: string
  distance_km?: number
  note?: string
  link?: string
}

export default function Schedule() {
  const items = (schedule as Item[]).slice(0, 6)
  return (
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
  )
}

