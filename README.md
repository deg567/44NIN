# 44NIN

개발/실행
- `npm install`
- `npm run dev` 로컬 개발 서버
- `npm run build` / `npm start` 프로덕션 빌드/서버

GitHub Pages 배포(정적 내보내기)
- 환경변수 설정 예시(GitHub Actions):
  - `GITHUB_PAGES=true`
  - `NEXT_PUBLIC_BASE_PATH=/<repo>` (예: `/44NIN`)
  - `NEXT_PUBLIC_SITE_URL=https://<user>.github.io/<repo>`
  - `NEXT_PUBLIC_WEATHER_LAT` / `NEXT_PUBLIC_WEATHER_LNG` (선택)
- 이 리포는 Pages용 정적 내보내기(`output: 'export'`)를 지원합니다. 빌드 결과는 `out/`에 생성됩니다.

환경변수(.env.local)
- `NEXT_PUBLIC_SITE_NAME` 사이트명
- `NEXT_PUBLIC_JOIN_LINK` 합류/공지 링크
- `ICAL_URL` iCal 캘린더 URL(선택, 없으면 JSON 폴백)
- `WEATHER_LAT` / `WEATHER_LNG` 날씨 좌표
- `AQI_TOKEN` 선택(AQI 제공 시)
- `NEXT_PUBLIC_MAPBOX_TOKEN` 선택(지도 필요 시)
  
GitHub Pages용 환경변수
- `GITHUB_PAGES` = `true` → 정적 내보내기/`basePath` 활성화
- `NEXT_PUBLIC_BASE_PATH` = `/<repo>` → 정적 자산/링크 경로 보정
- `NEXT_PUBLIC_SITE_URL` = `https://<user>.github.io/<repo>` → 메타/OG URL
- `NEXT_PUBLIC_WEATHER_LAT` / `NEXT_PUBLIC_WEATHER_LNG` → 클라이언트 날씨 위경도

API
- Vercel 배포 시
  - `GET /api/schedule?weeks=6&limit=12` iCal→JSON(6주), 실패 시 `content/schedule.json` 폴백. 캐시 `s-maxage=3600`.
  - `GET /api/weather` Open‑Meteo 현재 날씨 요약. 캐시 `s-maxage=1800`.
- GitHub Pages(정적) 배포 시
  - 일정은 `content/schedule.json` 정적 데이터 사용
  - 날씨는 클라이언트에서 Open‑Meteo API를 직접 요청

콘텐츠 업데이트
- 일정/코스/갤러리: `content/*.json` 수정
- GPX: `public/routes/*.gpx` 추가
