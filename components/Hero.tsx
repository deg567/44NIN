export default function Hero() {
  return (
    <section className="hero-kinetic bg-brand-dark text-white">
      <div className="hero-kinetic__bg" aria-hidden />
      <div className="hero-kinetic__stripes" aria-hidden />
      <div className="container py-24 sm:py-32 relative">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          WE ARE 44NIN RUNNERS
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-200">
          한국인삼공사 최초 사내 러닝 동호회
        </p>
        <a
          href="#join"
          className="mt-8 inline-block rounded bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:shadow-lg active:scale-95 transition will-change-transform"
        >
          함께 뛰기
        </a>
      </div>
      <div className="hero-kinetic__glow" aria-hidden />
    </section>
  )
}
