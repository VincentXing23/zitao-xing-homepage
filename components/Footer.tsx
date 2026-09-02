'use client'

import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { contact, normalizeLocale } from '@/lib/profile'

export function Footer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const supportsLocale = pathname === '/' || pathname === '/resume'
  const locale = supportsLocale ? normalizeLocale(searchParams.get('lang') ?? undefined) : 'en'

  return (
    <footer className="border-t border-black/10 bg-[#102022] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">{locale === 'zh' ? '邢梓韬' : 'Zitao Xing'}</p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-white/70">
            {locale === 'zh'
              ? '应用数学、数值方法、AI for Science 与图增强人工智能系统。'
              : 'Applied mathematics, numerical methods, AI for Science, and graph-enhanced AI systems.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href={`mailto:${contact.email}`}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/18 px-4 py-2 text-white/86 transition hover:border-white/40 hover:text-white"
          >
            <Mail size={16} aria-hidden="true" />
            {contact.email}
          </Link>
          <Link
            href={contact.phoneHref}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/18 px-4 py-2 text-white/86 transition hover:border-white/40 hover:text-white"
          >
            <Phone size={16} aria-hidden="true" />
            {contact.phone}
          </Link>
        </div>
      </div>
    </footer>
  )
}
