import '../styles/globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR, Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const noto = Noto_Sans_KR({ subsets: ['latin'], weight: ['400','500','700'], display: 'swap' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://44-nin.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WE ARE 44NIN RUNNERS',
    template: '%s | 44NIN Runners',
  },
  description: '44NIN 러너스를 위한 경량 웹 경험 (스케줄, 코스, 갤러리)',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: '44NIN Runners',
    description: '스케줄 · 코스 · 갤러리 — 간결하고 빠르게',
    siteName: '44NIN Runners',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${noto.className}`}>
        <Header />
        <div style={{ paddingTop: '56px' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
