'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { normalizeLocale, type Locale } from '@/lib/profile'

const navItems = {
  en: [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/resume', label: 'Resume' },
    { href: '/#contact', label: 'Contact', anchor: true },
  ],
  zh: [
    { href: '/', label: '主页' },
    { href: '/blog', label: '博客' },
    { href: '/resume', label: '简历' },
    { href: '/#contact', label: '联系', anchor: true },
  ],
} as const

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  function setLocale(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams.toString())
    if (nextLocale === 'zh') {
      params.set('lang', 'zh')
    } else {
      params.delete('lang')
    }
    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}${window.location.hash}`, { scroll: false })
  }

  return (
    <div className="flex shrink-0 rounded-sm border border-[#52f4df]/20 bg-[var(--surface)] p-0.5" aria-label="Language">
      {(['en', 'zh'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          aria-pressed={locale === item}
          className={`rounded-sm px-2.5 py-1.5 text-xs font-semibold transition ${
            locale === item ? 'bg-[#52f4df] text-[#06111a]' : 'text-[var(--body-text)] hover:text-[#52f4df]'
          }`}
        >
          {item === 'en' ? 'EN' : '中文'}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const supportsLocale = true
  const locale = normalizeLocale(searchParams.get('lang') ?? undefined)
  const localized = (href: string) => {
    const [path, hash] = href.split('#')
    return `${path}${locale === 'zh' ? '?lang=zh' : ''}${hash ? `#${hash}` : ''}`
  }

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[#0b1222]/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link href={localized('/')} className="flex shrink-0 items-center gap-3 font-semibold">
          <span className="grid size-10 place-items-center rounded-sm bg-[#52f4df] text-sm font-bold text-[#06111a] brand-monogram">
            ZX
          </span>
          <span className="hidden text-base text-[var(--foreground)] lg:inline">{locale === 'zh' ? '邢梓韬' : 'Zitao Xing'}</span>
        </Link>
        <div className="flex min-w-0 items-center gap-2">
          <nav className="flex min-w-0 items-center gap-0.5 overflow-x-auto text-sm font-medium text-[var(--body-text)]">
            {navItems[locale].map((item) => (
              <Link
                key={item.href}
                aria-current={!('anchor' in item) && (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? 'page' : undefined}
                href={'anchor' in item && item.anchor && pathname === '/' ? '#contact' : localized(item.href)}
                className={`shrink-0 rounded-sm px-2.5 py-2 transition hover:bg-[#52f4df]/10 hover:text-[#52f4df] sm:px-3 ${
                  'anchor' in item ? 'hidden sm:block' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {supportsLocale ? <LanguageSwitcher locale={locale} /> : null}
        </div>
      </div>
    </header>
  )
}
