export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <div className="container py-24 sm:py-32">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          WE ARE 44NIN RUNNERS
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-200">
          한국인삼공사 최초 사내 러닝 동호회 — 회원가입 없이 스케줄·코스·갤러리를 한 번에.
        </p>
        <a
          href="#join"
          className="mt-8 inline-block rounded bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          함께 뛰기
        </a>
      </div>
    </section>
  )
}
