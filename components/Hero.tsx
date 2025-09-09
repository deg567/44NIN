export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <div className="container py-24 sm:py-32">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          WE ARE 44NIN RUNNERS
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-200">
          회원가입 없이 스케줄 확인, 코스 탐색, 갤러리 감상 — 간결하고 빠르게.
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

