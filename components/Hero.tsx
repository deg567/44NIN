import Parallax from './Parallax'
import Countdown from './Countdown'

export default function Hero() {
  return (
    <section className="hero-kinetic bg-brand-dark text-white">
      <Parallax className="hero-kinetic__bg" speed={0.06} max={60}>
        {/* 배경 그라디언트 레이어 */}
      </Parallax>
      <Parallax className="hero-kinetic__stripes" speed={0.12} max={90}>
        {/* 스트라이프 레이어 */}
      </Parallax>
      <div className="container py-24 sm:py-32 relative">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          WE ARE 44NIN RUNNERS
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-200">
          한국인삼공사 최초 사내 러닝 동호회
        </p>
        <Countdown />
        <a
          href="#join"
          className="mt-8 inline-block rounded bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:shadow-lg active:scale-95 transition will-change-transform"
        >
          함께 뛰기
        </a>
      </div>
      <Parallax className="hero-kinetic__glow" speed={0.2} max={70}>
        {/* 글로우 레이어 */}
      </Parallax>
    </section>
  )
}
