export default function WeatherBadge() {
  // 간단한 더미 표시(나중에 API/캐시 연동)
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-700">
      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
      오늘 상태: 좋음
    </span>
  )
}

