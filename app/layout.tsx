import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AmbientBackground } from '@/components/AmbientBackground'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://zitao-xing-homepage.vercel.app'),
  title: {
    default: 'Zitao Xing',
    template: '%s | Zitao Xing',
  },
  description:
    'Zitao Xing is an incoming M.S. student in Applied Mathematics at Xiamen University working on numerical methods, machine learning, GraphRAG, and graph algorithms.',
  authors: [{ name: 'Zitao Xing' }],
  creator: 'Zitao Xing',
  openGraph: {
    title: 'Zitao Xing',
    description:
      'Incoming applied mathematics graduate student working on numerical methods, machine learning, GraphRAG, and graph algorithms.',
    type: 'website',
    images: ['/static/images/math-ai-hero.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AmbientBackground />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
