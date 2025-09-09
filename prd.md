**44NIN Runners — PRD (MVP v1.0)**

**Product Overview**
- 목적: 회원가입/게시판 없이도 역동적·현대적 경험으로 러닝 참여를 촉진.
- 슬로건: “WE ARE 44NIN RUNNERS”
- 핵심 가치: 에너지·속도·일체감. 간결한 참여 동선(사내 메신저 중심).
- 대상: 사내 러너(신규 합류자, 정기 참가자), 운영진(초경량 컨텐츠 관리).

**Goals**
- 주간/월간 스케줄 확인과 iCal 구독으로 참여 장벽 최소화.
- 5–8개 대표 코스 확인/다운로드(GPX)로 자율 러닝 지원.
- 역동적 히어로·마이크로 인터랙션으로 브랜드 에너지 체감.
- 운영 측면: 정적 사이트+간단 데이터 파일로 저유지보수.

**Out Of Scope**
- 회원가입/로그인, 포럼/댓글, 개인 통계·랭킹.
- 개인정보 수집·프로필 노출(PII 최소/불수집).

**User Journeys**
- 신규 합류: 모바일로 접속 → 히어로 → 스케줄 → “함께 뛰기” → 사내 메신저 채널 합류.
- 정기 참가자: 이번 주 일정·집결 장소·페이스 확인 → 캘린더 구독 유지.
- 코스 탐색: 거리/난이도/고도 확인 → GPX 다운로드 → 지도 미리보기.
- 후기 감상: 갤러리 타일 스크롤 → 하이라이트 3건 확인 → 공유.

**Information Architecture**
- Home 원페이지: Hero → About(네이밍/미션) → Schedule → Courses → Gallery → Join/Contact → FAQ/안전 → Footer.
- 라우팅(선택): `/courses/[slug]` 상세, 나머지는 Home 섹션 앵커.

**Feature Requirements (MVP)**
- Hero(키네틱 타이포)
  - 문구: “WE ARE 44NIN RUNNERS” + 짧은 보조 카피 1–2줄.
  - 배경: 루프 모션(비디오/캔버스/Lottie 중 택1), 스크롤 리액티브.
  - CTA: “함께 뛰기(Join on [사내 메신저])”.
  - Performance fallback: 저사양·저대역폭 자동 정지/정적 이미지 대체.
- Schedule(주간/월간)
  - 소스: iCal 구독 URL(권장) 또는 레포 내 `content/schedule.json`.
  - 표시: 다음 6주 이벤트 카드(일시/장소/페이스/거리/노트), 월간 스냅.
  - 액션: iCal/Outlook 구독 버튼, 공지 채널 링크.
  - 빈 상태: “예정 러닝이 없습니다. 채널 공지를 확인하세요.”
- Courses(코스 라이브러리)
  - 카드: 썸네일 지도, 거리(km)/고도(m)/난이도, 집결 위치.
  - 상세(선택): `/courses/[slug]`에서 지도 렌더(Static/Mapbox), 고도 프로필.
  - 다운로드: GPX 파일 제공.
- Gallery(사진 모자이크)
  - 소스: `/public/gallery` 이미지 + `content/gallery.json` 메타(alt, eventId, tags).
  - 레이아웃: 반응형 타일, 라이트박스 뷰어.
  - 개인정보: 얼굴 클로즈업 최소, alt 텍스트 필수.
- Join/Contact(합류/문의)
  - 버튼: 사내 메신저 초대/공지 채널로 딥링크.
  - 안내: 정기 요일/시간/집결 장소, 초보자 가이드.
- Weather/AQI 배지(간단)
  - 위치 프리셋 1곳(본사 주변). 현재 날씨/PM2.5 표시.
  - 상태 배지: “좋음/보통/주의” 가이드 텍스트.
  - 소스: 무료 API(캐시 30–60분) 또는 수동 토글(운영진 갱신).
- Footer/기타
  - 안전수칙/우천 시 공지 원칙/연락처.
  - SNS/Strava 클럽 링크(임베드 대신 링크 우선).
  - 저작권·이미지 라이선스 표기.

**Design System**
- 컬러: 브랜드 레드(포인트) + 차콜(#111~#222) + 화이트.
- 타이포: 헤드라인 Bold 산세리프 + 본문 한글 가독체(예: Pretendard/Noto Sans KR).
- 모션: 스크롤 드리븐 타이포, 숫자 카운트업, 카드 호버 고도 슬라이드.
- 접근성: 명도 대비 준수(AA), 포커스 표시, 키보드 내비게이션, alt/aria.

**Content Model**
- `content/schedule.json` (iCal 미사용 시)
  - `[{ id, date, time, title, location, pace, distance_km, note, link }]`
- `content/courses.json`
  - `[{ slug, title, distance_km, elevation_m, difficulty, meeting, center:[lat,lng], zoom, gpx:"/routes/x.gpx", image:"/courses/x.jpg" }]`
- `content/gallery.json`
  - `[{ src, alt, eventId, tags:["race","night"] }]`

**Non‑Functional Requirements**
- 성능: LCP < 2.0s(4G), CLS < 0.1, TBT < 200ms.
- 반응형: 모바일 우선(360–1440px), 60fps 애니메이션.
- 보안/개인정보: PII 수집 없음, 쿠키 미사용(또는 무동의 통계만).
- 국제화: 기본 한국어, 영문 메타/OG 최소 구성.

**Tech Stack**
- 프레임워크: Next.js(App Router, SSG/ISR).
- 스타일: Tailwind CSS 또는 CSS Modules(팀 선호).
- 지도: Mapbox GL JS(토큰 필요) 또는 Static Maps(무토큰 대체).
- 그래픽: Lottie/Canvas(선택), 이미지 최적화(Next/Image).
- 데이터: 정적 JSON/Markdown + GPX 파일.
- 통계: Plausible/Umami(선택) 또는 비활성.
- 배포: Vercel(Preview/Prod, Edge 캐시, ISR).

**Vercel Deployment**
- 프로젝트 설정
  - Framework: Next.js, Build Command `next build`, Output `/.next`.
  - Environment Variables: `NEXT_PUBLIC_MAPBOX_TOKEN`(선택), `WEATHER_API_URL`/`KEY`(선택), `ICAL_URL`(선택).
  - Image Domains: 필요 시 외부 이미지 호스트 추가.
  - Caching: ISR(예: `/` 60분), Weather API는 Edge Function + 30–60분 SWR.
- 브랜치 전략: `main`=prod, PR=preview URL 자동 발행.
- 커스텀 도메인: `44nin.run` 또는 사내 서브도메인 CNAME.

**Acceptance Criteria (Per Feature)**
- Hero
  - 최초 뷰포트 내 60fps 애니메이션, 저사양에서 자동 정지/정적 대체.
  - 헤드라인/CTA 1초 내 가시.
- Schedule
  - 다음 6주 이벤트 노출, iCal 구독 동작.
  - iCal 미연동 시 JSON 백업 데이터로 동일 렌더.
- Courses
  - 최소 5개 카드, 거리/고도/난이도/집결 표시.
  - GPX 다운로드 정상, 지도 미리보기 정상.
- Gallery
  - 최소 20장 타일, 라이트박스 네비게이션, alt 제공.
- Join/Contact
  - 메신저 딥링크 작동, 안내 문구 노출.
- Weather/AQI
  - 수치 표기와 상태 배지 일관, API 실패 시 “데이터 없음” 안전표시.
- A11y/Perf
  - Lighthouse Performance ≥ 90, Accessibility ≥ 90(모바일).
  - 키보드 포커스/스크린리더 레이블 확인.

**Operations**
- 콘텐츠 업데이트
  - 스케줄: iCal 연동 또는 `content/schedule.json` PR 수정.
  - 코스/갤러리: JSON/이미지 추가 후 자동 빌드.
- 이미지 정책
  - WebP/AVIF 우선, 2560px 상한, 썸네일 자동 리사이즈(빌드시).
- 에러/상태
  - 외부 API 장애 시 배지/섹션 내 안전한 빈 상태 문구.

**Metrics**
- 행동: iCal 구독 클릭 수, Join 클릭 수.
- 소비: 코스 카드 클릭/GPX 다운로드 수.
- 품질: 모바일 LCP/CLS, 에러율.
- 유지보수: 콘텐츠 PR 리드타임.

**Risks & Mitigations**
- iCal 미준비: JSON 데이터로 시작 → iCal 전환.
- Mapbox 토큰 지연: Static Maps/캡처 썸네일로 대체.
- 사진 PII: 모자이크/원거리 샷 기준 합의, 사전 검수 플로우.
- 날씨 API 한도: 캐시·SWR, 필요 시 수동 토글.

**Release Plan (2–4 Days)**
- Day 1: Next.js 스캐폴딩, Hero/레아이웃, 디자인 토큰, Gallery/Join 섹션.
- Day 2: Schedule(JSON) + iCal 버튼, Courses 카드+GPX 다운로드, Weather 배지(더미/캐시).
- Day 3: 성능/접근성 튜닝, OG/SEO, Vercel 세팅(도메인·ENV), 콘텐츠 주입.
- Day 4: 리뷰/QA, 미세 조정, 프로덕션 전환.

**QA Checklist**
- 모바일 Safari/Chrome 레이아웃 파손 없음.
- 저대역폭에서 히어로 대체 이미지/정지 확인.
- iCal/Outlook 모두 구독 동작.
- 키보드 탭 순서·포커스 링 확인.
- 이미지 대체 텍스트/라이트박스 ESC 동작.

**Open Questions**
- 사내 메신저 플랫폼/초대 링크(Teams/Slack/Workplace?) 확정 필요.
- iCal 제공원(사내 캘린더/Google/Outlook)과 URL.
- 지도 토큰 유무(Mapbox/대체).
- 브랜드 컬러 코드/폰트 선호(회사 가이드 여부).
- 날씨/AQI API 선택 또는 수동 운용 여부.

**Next Steps**
- Vercel 프로젝트 개설(리포 권한 공유) 및 환경변수/도메인 확정.
- 초기 콘텐츠 수집(스케줄 4–6주, 코스 5–8개 GPX, 갤러리 20–30장).
- iCal·메신저 링크 전달 시 바로 MVP 구현/배포 진행.

