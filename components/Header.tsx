import Link from 'next/link'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fffaf0]/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid size-10 place-items-center rounded-full bg-[#075e63] text-sm font-bold text-white">
            ZX
          </span>
          <span className="hidden text-base text-[#102022] sm:inline">Zitao Xing</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto text-sm font-medium text-[#31413f]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-[#075e63]/10 hover:text-[#075e63]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
