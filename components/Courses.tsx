import Link from 'next/link'
import courses from '@/content/courses.json'

type Course = {
  slug: string
  title: string
  distance_km: number
  elevation_m?: number
  difficulty?: string
  meeting?: string
  gpx?: string
  image?: string
}

export default function Courses() {
  const list = courses as Course[]
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((c) => (
        <article key={c.slug} className="rounded-lg border p-4">
          <div className="aspect-video w-full rounded bg-neutral-100 mb-3" />
          <h3 className="font-semibold text-lg">{c.title}</h3>
          <p className="text-sm text-neutral-600">
            {c.distance_km}km · 고도 {c.elevation_m ?? 0}m · {c.difficulty ?? '보통'}
          </p>
          <div className="mt-3 flex gap-3">
            <Link href={`/courses/${c.slug}`} className="text-brand-red text-sm hover:underline">
              상세보기
            </Link>
            {c.gpx ? (
              <a href={`${basePath}${c.gpx}`} className="text-sm text-neutral-700 hover:underline" download>
                GPX 다운로드
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}
