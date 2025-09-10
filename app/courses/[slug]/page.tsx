import { notFound } from 'next/navigation'
import Link from 'next/link'
import data from '@/content/courses.json'
import type { Course } from '@/lib/types'
import RouteTrace from '@/components/RouteTrace'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  const list = data as Course[]
  return list.map((c) => ({ slug: c.slug }))
}

export default function CourseDetail({ params }: Params) {
  const list = data as Course[]
  const course = list.find((c) => c.slug === params.slug)
  if (!course) return notFound()

  return (
    <main className="container py-12">
      <Link href="/" className="text-sm text-neutral-600 hover:underline">← 돌아가기</Link>
      <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>
      <p className="mt-2 text-neutral-700">
        거리 {course.distance_km}km · 고도 {course.elevation_m ?? 0}m · {course.difficulty ?? '보통'}
      </p>
      <div className="mt-6 aspect-video w-full rounded bg-neutral-100" />
      {course.gpx ? (
        <RouteTrace gpxUrl={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${course.gpx}`} />
      ) : null}
      <div className="mt-6 flex gap-4">
        {course.gpx ? (
          <a className="text-brand-red hover:underline" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${course.gpx}`} download>
            GPX 다운로드
          </a>
        ) : null}
        {course.meeting ? (
          <span className="text-neutral-700">집결: {course.meeting}</span>
        ) : null}
      </div>
    </main>
  )
}
