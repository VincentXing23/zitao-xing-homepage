import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { contact } from '@/lib/profile'

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#102022] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Zitao Xing</p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-white/70">
            Mathematics, optimization, and AI-assisted learning systems.
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
