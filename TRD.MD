**44NIN Runners — TRD (MVP v1.0)**

본 문서는 PRD 기반의 상위 기술 설계와 배포 전략을 정의합니다. 상세 컴포넌트/클래스 수준 설계, 픽셀 단위 UI 스펙, 구현 코드는 본 문서 범위 밖입니다.

**1) Scope**
- In: 기술 스택 선정, 아키텍처/데이터 흐름, API 경계, 배포/운영, 비기능 요구, 성능/보안 가이드.
- Out: 상세 컴포넌트 설계, DB 스키마(미사용), 픽셀 스펙, 테스트 케이스 세부 절차.

**2) System Overview**
- 정적 우선(SSG) + ISR 기반의 단일 웹사이트. 데이터는 정적 JSON과 퍼블릭 자산 중심.
- 외부 연동은 읽기 전용(캘린더 iCal, 날씨/AQI). 로그인/게시판/DB 없음.
- Vercel에 배포하여 빠른 프리뷰와 프로덕션 전환.

**3) High‑Level Architecture**
- 클라이언트: Next.js(App Router) 정적 페이지와 경량 인터랙션(Framer Motion/CSS).
- 서버(서버리스/엣지):
  - `/api/schedule`: iCal → 표준 이벤트 JSON 변환, 캐시.
  - `/api/weather`: Open‑Meteo(무키) + AQI(선택) 집계, 캐시.
- 데이터 소스: `content/*.json`, `public/routes/*.gpx`, `public/gallery/*`.
- 지도: 코스 썸네일은 정적 이미지(최소마찰). Mapbox 토큰 제공 시 지도 미리보기 사용.
- 배포/캐싱: Vercel CDN + ISR 재생성, API는 Edge/Serverless에 30–60분 캐시.

아키텍처 데이터 흐름(텍스트 다이어그램)
- 브라우저 → Vercel CDN(정적 HTML/CSS/JS, 이미지)
- 브라우저 → `/api/schedule`(서버리스) → ICS 원본 → 표준 JSON → CDN 캐시
- 브라우저 → `/api/weather`(엣지/서버리스) → Open‑Meteo/AQI → 요약 JSON → 캐시
- 브라우저 → 정적 자산(`public/gallery`, GPX) 직접 다운로드

**4) Stack Decisions**
- 프레임워크: Next.js 14(App Router), TypeScript.
- 스타일: Tailwind CSS(+ PostCSS, Autoprefixer). 글로벌 토큰 기반.
- 애니메이션: Framer Motion(핵심 모션), CSS transform(마이크로 인터랙션).
- 글꼴: `next/font`(Google Noto Sans KR + Inter) 자가 호스팅, 서브셋/프리로드.
- 일정 파서: `node-ical`(서버 전용) + `date-fns`(타임존: Asia/Seoul 기준 처리).
- 데이터 검증: `zod`(환경변수/콘텐츠 스키마 런타임 가드).
- 지도: 기본은 정적 이미지. 선택적으로 Mapbox GL(JS) 또는 Static Images API.
- 이미지 최적화: `next/image`(WebP/AVIF, placeholder blur).
- 분석: Vercel Web Analytics(경량, 선택) — 쿠키/PII 비수집.

패키지(요지)
- deps: next, react, react-dom, typescript, tailwindcss, autoprefixer, framer-motion, node-ical, date-fns, zod
- devDeps: eslint, prettier, @types/node 등 기본

**5) Routing & Rendering Strategy**
- App Router 기반 SSG + ISR:
  - `/`(Home): SSG, `revalidate: 3600s`.
  - `/courses/[slug]`(선택): SSG, 정적 데이터 기반.
  - `/api/schedule`: Serverless, s‑maxage 1800–3600, SWR 24h.
  - `/api/weather`: Edge(Function) 또는 Serverless, s‑maxage 1800–3600.
- 내비게이션: 원페이지 섹션 앵커 + 선택적 상세 라우트.

**6) Data & Content Model (고수준)**
- `content/schedule.json` (백업 소스)
  - 배열: `{ id, date, time, title, location, pace, distance_km, note, link }`
- `content/courses.json`
  - 배열: `{ slug, title, distance_km, elevation_m, difficulty, meeting, center:[lat,lng], zoom, gpx, image }`
- `content/gallery.json`
  - 배열: `{ src, alt, eventId?, tags? }`
- 파일 배치: GPX → `public/routes/`, 갤러리 → `public/gallery/`.
- 스키마 검증: 빌드 시 Zod 가드, 실패 시 빌드 실패.

**7) API Design (경계 정의)**
- GET `/api/schedule`
  - 입력: 쿼리 `?weeks=6&limit=12`(선택), 원본 iCal URL은 서버 환경변수에서 획득.
  - 처리: iCal → 표준 이벤트 JSON, 과거 필터링, 소팅.
  - 캐시: `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`.
  - 폴백: iCal 실패 시 `content/schedule.json`.
- GET `/api/weather`
  - 입력: 고정 좌표(환경변수/설정), 소스: Open‑Meteo(무키), AQI(토큰 보유 시 병합).
  - 출력: `{ tempC, condition, pm25?, aqiGrade: good|fair|caution|null, updatedAt }`.
  - 캐시: 30–60분, 장애 시 `null` or 안전 문구로 폴백.
- GET `/api/health` (선택)
  - 빌드 시간/버전 리포트로 가시성.

**8) Configuration & Secrets**
- `.env`(예시 키)
  - `NEXT_PUBLIC_SITE_NAME=44NIN Runners`
  - `NEXT_PUBLIC_JOIN_LINK=` 사내 메신저 초대/공지 링크
  - `ICAL_URL=` 외부 iCal 주소(선택, 없으면 JSON 폴백)
  - `WEATHER_LAT=37.5665` / `WEATHER_LNG=126.9780`
  - `AQI_TOKEN=` 선택(AQICN 등), 없으면 AQI 미표시
  - `NEXT_PUBLIC_MAPBOX_TOKEN=` 선택(지도가 필요할 때만)
  - `NEXT_PUBLIC_ANALYTICS=vercel` 선택
- 런타임 접근은 별도 `config/runtime.ts`에서 zod로 검증.

**9) Directory Layout (상위 레벨)**
- `app/` — App Router, `layout.tsx`, `page.tsx`, `api/` 라우트 핸들러
- `components/` — Hero, Schedule, Courses, Gallery, Badges 등 재사용 컴포넌트
- `lib/` — iCal 파서, 날씨/AQI 집계, 캐시/헬퍼, 형식화 유틸
- `content/` — 정적 JSON 데이터(스케줄/코스/갤러리)
- `public/` — 이미지, GPX, 폰트 등 정적 자산
- `styles/` — Tailwind 설정 및 글로벌 스타일
- `config/` — 사이트 메타/브랜드 토큰, 런타임 설정

**10) Performance & Caching**
- 목표: 모바일 LCP < 2.0s, CLS < 0.1, TBT < 200ms.
- 전략:
  - 위폴드 최소 JS, Hero 모션은 60fps CSS/transform 우선.
  - `next/font`로 FOUT/FOIT 완화, 폰트 서브셋/프리로드.
  - 이미지: WebP/AVIF, 사이즈별 `srcset`, lazy + priority.
  - SSG + ISR(홈 3600s), API 응답 s‑maxage 1800–3600.
  - Map/비디오 지연 로드, 저사양에서는 정적 대체.

**11) Accessibility & SEO**
- A11y: 키보드 포커스, ARIA 레이블, alt 텍스트, 명도 대비 AA.
- SEO/OG: 타이틀/디스크립션/OG 이미지, 기본 스키마(Organization). 다국어는 한국어 기본.

**12) Security & Privacy**
- 쿠키 미사용(또는 Vercel Analytics만), 로깅에 PII 포함 금지.
- 이미지 정책: 얼굴 클로즈업 최소, alt/모자이크 기준 운영 가이드 준수.
- 헤더: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` 등 기본 보안 헤더(VerceI 설정/미들웨어).

**13) Analytics & Observability**
- 기본: Vercel Web Analytics(선택). 로그: Vercel Functions 로그.
- 에러 추적: Sentry(선택, MVP 범위 밖). 헬스 체크 `/api/health`.

**14) Testing Strategy (상위 수준)**
- 정적 검증: TypeScript, ESLint, Prettier, Zod 스키마 체크.
- 유닛: iCal 파싱/정렬 유틸, 날씨 변환 로직 최소 커버리지.
- E2E(선택): Playwright 스모크(히어로/스케줄/코스/갤러리/문의 가시성).
- QA: Lighthouse 모바일 ≥ 90(A11y/Perf), 주요 브라우저 수동 점검.

**15) Deployment on Vercel**
- 빌드: `next build`(Node 18+), 출력 `/.next`. 프리뷰/프로덕션 자동 분기.
- ISR: 홈/상세 페이지 60분 재검증. API는 헤더 캐시.
- 환경변수: 프로젝트/환경별 설정(Preview/Prod 분리). 시크릿은 서버 전용.
- 도메인: 커스텀 도메인 매핑(CNAME). 이미지 도메인 화이트리스트 설정.
- 지역: 기본 글로벌 에지. 특별 지역 고정 불필요(지연 민감도 낮음).

**16) Feature‑level Technical Acceptance (요약)**
- Hero: 60fps 애니메이션, 저대역폭/저사양 자동 대체 이미지.
- Schedule: iCal → 6주 노출, iCal 부재 시 JSON 폴백 동일 렌더.
- Courses: 5개+ 카드, GPX 다운로드, 지도 미리보기(토큰 시) 또는 정적 썸네일.
- Gallery: 반응형 타일, 라이트박스, alt 제공.
- Join/Contact: 메신저 딥링크 정상 작동.
- Weather/AQI: 30–60분 캐시, 장애 시 안전한 빈 상태.

**17) Risks & Fallbacks**
- iCal 미제공/불가: `content/schedule.json`만으로 운영, iCal 후행 연동.
- 지도 토큰 미보유: 정적 썸네일/고정 이미지로 유지.
- 날씨/AQI 한도/장애: 날씨만 표기 또는 배지 비표시.
- 성능 이슈: 모션 강도 완화, 이미지 품질/용량 자동 하향.

**18) Rollout Plan**
- Day 1: 리포 초기화(템플릿), 레이아웃/히어로/섹션 골격, Vercel 프로젝트 생성.
- Day 2: Schedule(JSON/ICS API), Courses/GPX, Gallery 스캐폴드, Weather API(더미).
- Day 3: 성능/접근성 조정, 메타/OG, ENV 배치, 프리뷰 리뷰.
- Day 4: 최종 QA, 도메인 연결, 프로덕션 승격.

**19) Open Items**
- 사내 메신저 링크, iCal URL, 기본 좌표(집결 위치), 브랜드 컬러/로고 파일.
- 선택 기능 여부: Mapbox 지도를 초기에 포함할지(토큰 의존) 혹은 후행.

본 TRD는 상위 설계를 확정하기 위한 문서입니다. 상세 설계(컴포넌트 구조/상태 관리/정확한 API 스키마)와 구현은 본 문서 승인 후 단계적으로 진행합니다.

