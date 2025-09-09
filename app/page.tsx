import Hero from '@/components/Hero'
import Schedule from '@/components/Schedule'
import Courses from '@/components/Courses'
import Gallery from '@/components/Gallery'
import Join from '@/components/Join'
import WeatherBadge from '@/components/WeatherBadge'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="container py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">이번 주 일정</h2>
          <WeatherBadge />
        </div>
        <Schedule />
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-4">대표 코스</h2>
        <Courses />
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-4">갤러리 하이라이트</h2>
        <Gallery />
      </section>

      <section className="container py-16">
        <Join />
      </section>

      <Footer />
    </main>
  )
}

