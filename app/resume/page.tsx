import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, Mail, Phone } from 'lucide-react'
import { contact, education, experiences, honors, profileSummary, skillGroups } from '@/lib/profile'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume for Zitao Xing, an incoming applied mathematics graduate student at Xiamen University.',
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <section className="border-b border-black/10 pb-10">
        <p className="text-sm font-semibold uppercase text-[#075e63]">Resume</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-semibold text-[#102022]">Zitao Xing</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#31413f]">{profileSummary}</p>
          </div>
          <Link
            href={contact.resumeHref}
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#075e63] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#064d51]"
          >
            <Download size={17} aria-hidden="true" />
            Download PDF
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#31413f]">
          <Link
            href={`mailto:${contact.email}`}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-black/12 bg-white/70 px-4 py-2"
          >
            <Mail size={16} aria-hidden="true" />
            {contact.email}
          </Link>
          <Link
            href={contact.phoneHref}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-black/12 bg-white/70 px-4 py-2"
          >
            <Phone size={16} aria-hidden="true" />
            {contact.phone}
          </Link>
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-semibold text-[#102022]">Education</h2>
        <div className="mt-5 grid gap-4">
          {education.map((item) => (
            <article key={`${item.institution}-${item.period}`} className="rounded-lg border border-black/10 bg-white/78 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.institution}</h3>
                  <p className="mt-1 text-[#31413f]">{item.role}</p>
                </div>
                <p className="text-sm font-semibold text-[#075e63]">{item.period}</p>
              </div>
              <p className="mt-2 text-sm text-[#66736f]">{item.location}</p>
              <p className="mt-3 leading-7 text-[#31413f]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-black/10 py-10">
        <h2 className="text-2xl font-semibold text-[#102022]">Internship & Experience</h2>
        <div className="mt-5 grid gap-4">
          {experiences.map((item) => (
            <article key={`${item.title}-${item.period}`} className="rounded-lg border border-black/10 bg-white/78 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-[#31413f]">
                    {item.role} · {item.organization}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#075e63]">{item.period}</p>
              </div>
              <ul className="mt-4 space-y-3 text-[#31413f]">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 leading-7">
                    <span className="mt-3 size-2 shrink-0 rounded-full bg-[#c8841d]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-t border-black/10 py-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-[#102022]">Honors & Awards</h2>
          <ul className="mt-5 space-y-3 leading-7 text-[#31413f]">
            {honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#102022]">Skills & Interests</h2>
          <div className="mt-5 grid gap-4">
            {skillGroups.map((group) => (
              <div key={group.name}>
                <p className="font-semibold text-[#075e63]">{group.name}</p>
                <p className="mt-1 leading-7 text-[#31413f]">{group.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
