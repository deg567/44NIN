# 44NIN

개발/실행
- `npm install`
- `npm run dev` 로컬 개발 서버
- `npm run build` / `npm start` 프로덕션 빌드/서버

환경변수(.env.local)
- `NEXT_PUBLIC_SITE_NAME` 사이트명
- `NEXT_PUBLIC_JOIN_LINK` 합류/공지 링크
- `ICAL_URL` iCal 캘린더 URL(선택, 없으면 JSON 폴백)
- `WEATHER_LAT` / `WEATHER_LNG` 날씨 좌표
- `AQI_TOKEN` 선택(AQI 제공 시)
- `NEXT_PUBLIC_MAPBOX_TOKEN` 선택(지도 필요 시)

API
- `GET /api/schedule?weeks=6&limit=12` iCal→JSON(6주), 실패 시 `content/schedule.json` 폴백. 캐시 `s-maxage=3600`.
- `GET /api/weather` Open‑Meteo 현재 날씨 요약. 캐시 `s-maxage=1800`.

콘텐츠 업데이트
- 일정/코스/갤러리: `content/*.json` 수정
- GPX: `public/routes/*.gpx` 추가
