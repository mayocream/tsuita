import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const NotoSansJP = Noto_Serif_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '対多 - 偽中国語掲示板（仮）',
  description: '偽中国語掲示板（仮）',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${NotoSansJP.className} antialiased`}>{children}</body>
    </html>
  )
}
