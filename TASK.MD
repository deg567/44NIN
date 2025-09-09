**44NIN Runners — TASKS (MVP v1.0)**

본 문서는 PRD(prd.md)와 TRD(TRD.MD)를 실행 가능한 작업 단위로 분해한 상위 수준 작업 목록입니다. 상세 설계/구현 지시는 범위 밖이며, 빠른 Vercel 배포와 동작 확인을 목표로 합니다.

**0) Scope & Goals**
- 목적: 회원가입/게시판 없이 현대적 원페이지 사이트를 Next.js + Vercel로 신속 배포.
- 범위: 히어로, 스케줄(iCal/JSON), 코스(GPX), 갤러리, 합류/문의, 간단 Weather/AQI, 성능/접근성/배포.

**1) Timeline & Milestones (4 Days)**
- M0 사전 준비(0.5d)
  - [ ] Git 리포 초기화/확인(메인 브랜치 보호 규칙 설정)
  - [ ] Vercel 프로젝트 생성 및 리포 연결
  - [ ] 환경변수 키 스텁 등록(Preview/Prod 분리): `NEXT_PUBLIC_JOIN_LINK`, `ICAL_URL?`, `WEATHER_LAT/LNG`, `NEXT_PUBLIC_MAPBOX_TOKEN?`, `AQI_TOKEN?`
  - [ ] 팀 액세스/도메인 정책 합의(사내 서브도메인 or 커스텀)

- M1 Day 1 — Skeleton & Theming
  - [ ] Next.js(App Router, TS) + Tailwind 초기화, 기본 ESLint/Prettier
  - [ ] 글로벌 레이아웃/네비(섹션 앵커) + 컬러/타이포 토큰 적용
  - [ ] Hero 섹션 스캐폴드(키네틱 타이포 placeholder, reduced‑motion 대응)
  - [ ] Content 디렉토리 및 샘플 데이터 생성: `content/schedule.json`, `content/courses.json`, `content/gallery.json`
  - [ ] 정적 자산 자리잡기: `public/routes/*.gpx`(샘플), `public/gallery/*`(플레이스홀더)
  - [ ] Vercel 1차 프리뷰 배포 확인

- M2 Day 2 — Core Features
  - [ ] Schedule: `/api/schedule`(node-ical, zod, iCal→JSON, 6주 필터, s-maxage 3600)
  - [ ] Schedule 컴포넌트: 이벤트 카드, iCal/Outlook 구독 버튼, 빈상태 처리
  - [ ] Courses: 카드 목록(거리/고도/난이도/집결), GPX 다운로드, 썸네일(정적)
  - [ ] Courses 상세(선택): `/courses/[slug]` SSG, 지도 미리보기(토큰 시)
  - [ ] Gallery: 반응형 타일 + 라이트박스, alt 필수
  - [ ] Join/Contact: 메신저 딥링크 버튼, 기본 안내 문구
  - [ ] Weather/AQI: `/api/weather`(Open‑Meteo, 선택 AQI), 30–60분 캐시, 안전 폴백

- M3 Day 3 — Perf, A11y, Meta
  - [ ] `next/image` 적용(WebP/AVIF, priority/lazy) + 이미지 사이즈 점검
  - [ ] `next/font`(Noto Sans KR + Inter) 서브셋/프리로드
  - [ ] Framer Motion(필수 모션만) + 저사양/저대역폭 대체 처리
  - [ ] 메타/OG/구조화 데이터(Organization) + 기본 보안 헤더 설정
  - [ ] 런타임 설정 검증(config + zod), 에러/빈상태 UX 일관화
  - [ ] Lighthouse(모바일) ≥ 90 Perf/A11y 목표 확인 및 튜닝

- M4 Day 4 — QA & Release
  - [ ] 모바일 Safari/Chrome 수동 QA(히어로/스케줄/코스/갤러리/문의)
  - [ ] iCal/Outlook 구독 링크 동작 검증
  - [ ] 도메인 연결(CNAME) 및 HTTPS 확인, 이미지 도메인 화이트리스트
  - [ ] 최종 콘텐츠 반영(스케줄/코스/갤러리) → Prod 승격

**2) Feature Tasks (Checklists)**
- Hero
  - [ ] 키네틱 타이포(“WE ARE 44NIN RUNNERS”), 60fps 기본/대체 이미지 준비
  - [ ] CTA: “함께 뛰기” → `NEXT_PUBLIC_JOIN_LINK`
  - [ ] Reduced‑motion 미디어쿼리 및 성능 폴백

- Schedule
  - [ ] `node-ical` 파싱 유틸(lib) + zod 스키마
  - [ ] ICS 실패 시 `content/schedule.json` 폴백
  - [ ] 이벤트 카드 UI(일시/장소/페이스/거리/노트)
  - [ ] iCal/Outlook 구독 버튼(가이드 카피 포함)

- Courses
  - [ ] `content/courses.json` 스키마 검증
  - [ ] 카드 + 상세(선택), GPX 다운로드, 고도/난이도 표기
  - [ ] 지도: Mapbox 토큰 시 미리보기, 미보유 시 정적 썸네일

- Gallery
  - [ ] 타일 레이아웃 + 라이트박스(키보드/ESC)
  - [ ] alt 텍스트/PII 가이드 준수(클로즈업 최소)

- Weather/AQI
  - [ ] Open‑Meteo 호출(무키), 좌표는 ENV 기반
  - [ ] AQI 병합(토큰 보유 시), 상태 배지(Good/Fair/Caution)
  - [ ] 데이터 실패 시 안전 문구/숨김 처리

- A11y/Perf/SEO
  - [ ] 포커스/ARIA/명도 대비(AA), 탭 이동 확인
  - [ ] 이미지 최적화, 스크립트 최소화(위폴드 경량)
  - [ ] 메타/OG/파비콘/소셜 카드

- Security/Infra
  - [ ] 보안 헤더(Referrer‑Policy, X‑Content‑Type‑Options, Permissions‑Policy)
  - [ ] Vercel Analytics(선택, PII 비수집)
  - [ ] `/api/health`(선택) 배포 버전/시간 확인용

**3) Configuration & ENV (Actions)**
- [ ] Vercel Project Env — Preview/Prod 분리 설정
  - `NEXT_PUBLIC_SITE_NAME` → 44NIN Runners
  - `NEXT_PUBLIC_JOIN_LINK` → 사내 메신저 초대/공지 링크
  - `ICAL_URL` → 제공 시 입력(미제공 시 생략)
  - `WEATHER_LAT` / `WEATHER_LNG` → 집결 좌표(예: 본사)
  - `NEXT_PUBLIC_MAPBOX_TOKEN` → 선택(있을 때만)
  - `AQI_TOKEN` → 선택(AQICN 등)
- [ ] Image Domains(필요 시) 설정
- [ ] 도메인 연결(CNAME) 및 HTTPS 확인

**4) CI/CD & Tooling**
- [ ] Vercel Git 통합(PR 프리뷰 자동 발행)
- [ ] 기본 CI: Lint/TypeCheck(옵션), 빌드 검증
- [ ] 코드 스타일: ESLint/Prettier 규칙 확정

**5) Acceptance (요약, PRD 기준)**
- [ ] Hero: 60fps, 1초 내 헤드라인/CTA, 폴백 제공
- [ ] Schedule: 6주 노출, iCal 구독 동작, JSON 폴백
- [ ] Courses: 5개+, GPX 다운로드, 지도(선택)/썸네일
- [ ] Gallery: 20장+, 라이트박스, alt 제공
- [ ] Join/Contact: 딥링크 OK, 안내 문구
- [ ] Weather/AQI: 수치/배지 일관, 실패 시 안전표시
- [ ] Perf/A11y: Lighthouse(모바일) ≥ 90 / ≥ 90

**6) Dependencies & Inputs**
- [ ] 사내 메신저 링크(Teams/Slack/Workplace) 확정
- [ ] iCal URL(또는 4–6주 스케줄 JSON 제공)
- [ ] 코스 5–8개(거리/고도/난이도/집결, GPX)
- [ ] 갤러리 20–30장(PII 정책 준수)
- [ ] 브랜드 색상/로고/폰트(선택)

**7) Risks & Decisions**
- [ ] Mapbox 토큰 미보유 → 정적 썸네일로 릴리스 결정
- [ ] 날씨/AQI 한도 → 날씨만 표기 or 배지 비표시 정책
- [ ] iCal 지연 → JSON 운영 시작 후 전환 일정 합의
- [ ] 개인정보 가이드 → 얼굴 클로즈업 최소/사전 검수 프로세스 확정

**8) Handover & Ops**
- [ ] README: 로컬 실행, 콘텐츠 업데이트 방법(`content/*.json`, 이미지 경로)
- [ ] 운영 가이드: 스케줄/코스/갤러리 업데이트 플로우 정리
- [ ] 장애 플랜: 외부 API 실패 시 공지 문구/대체 절차

본 TASK 문서는 상위 작업 가이드를 제공합니다. 상세 설계/구현은 TRD 승인 후 개별 이슈/PR로 분할 진행합니다.

