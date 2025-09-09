export default function Join() {
  return (
    <div id="join" className="rounded-lg border p-6">
      <h3 className="text-xl font-semibold">함께 뛰기 / 문의</h3>
      <p className="mt-2 text-neutral-700">
        정기 요일/시간/집결 장소는 상단 스케줄을 확인하세요. 사내 메신저 초대 링크로 합류할 수 있습니다.
      </p>
      <div className="mt-4 flex gap-3">
        <a
          href="#"
          className="rounded bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          사내 메신저 합류
        </a>
        <a href="#" className="text-sm text-neutral-700 hover:underline">
          공지 채널 열기
        </a>
      </div>
    </div>
  )
}

