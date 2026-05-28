import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://zitao-xing.local'),
  title: {
    default: 'Zitao Xing',
    template: '%s | Zitao Xing',
  },
  description:
    'Zitao Xing is a mathematics undergraduate at Xiamen University interested in applied mathematics, machine learning, retrieval-augmented generation, operations research, and graph algorithms.',
  authors: [{ name: 'Zitao Xing' }],
  creator: 'Zitao Xing',
  openGraph: {
    title: 'Zitao Xing',
    description:
      'Mathematics undergraduate focused on applied mathematics, machine learning, retrieval-augmented generation, operations research, and graph algorithms.',
    type: 'website',
    images: ['/static/images/math-ai-hero.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
