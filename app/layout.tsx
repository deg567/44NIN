import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WE ARE 44NIN RUNNERS',
  description: '44NIN 러너스를 위한 경량 웹 경험 (스케줄, 코스, 갤러리)'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
}
