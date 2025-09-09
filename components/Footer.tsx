export default function Footer() {
  return (
    <footer className="mt-16 border-t py-8 text-sm text-neutral-600">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 44NIN RUNNERS</p>
        <nav className="flex gap-4">
          <a href="#" className="hover:underline">안전수칙</a>
          <a href="#" className="hover:underline">Strava</a>
          <a href="#" className="hover:underline">개인정보 최소 수집 정책</a>
        </nav>
      </div>
    </footer>
  )
}

