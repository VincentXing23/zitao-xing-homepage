import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ExternalLink, Mail, Phone } from 'lucide-react'
import { contact, getProfile, normalizeLocale, type ExperienceItem } from '@/lib/profile'

type ResumePageProps = {
  searchParams: Promise<{ lang?: string | string[] }>
}

const copy = {
  en: {
    metadataTitle: 'Resume',
    metadataDescription: 'Resume for Zitao Xing, an incoming applied mathematics graduate student at Xiamen University.',
    eyebrow: 'Resume',
    download: 'Download English PDF',
    alternateDownload: '下载中文 PDF',
    education: 'Education',
    internships: 'Internship Experience',
    projects: 'Research & Projects',
    honors: 'Honors & Awards',
    skills: 'Skills & Interests',
  },
  zh: {
    metadataTitle: '简历',
    metadataDescription: '邢梓韬的中文简历，研究方向包括应用数学、AI for Science、Agent 开发与 GraphRAG。',
    eyebrow: '个人简历',
    download: '下载中文 PDF',
    alternateDownload: 'Download English PDF',
    education: '教育经历',
    internships: '实习经历',
    projects: '科研与项目经历',
    honors: '竞赛与荣誉',
    skills: '技能与兴趣',
  },
} as const

function ExperienceSection({ title, items }: { title: string; items: ExperienceItem[] }) {
  return (
    <section className="border-t border-black/10 py-10">
      <h2 className="text-2xl font-semibold text-[#102022]">{title}</h2>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-black/10 bg-white/78 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#075e63] hover:underline"
                    >
                      {item.title}
                      <ExternalLink size={16} aria-hidden="true" />
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-1 text-[#31413f]">
                  {item.role} · {item.organization}
                </p>
              </div>
              <p className="text-sm font-semibold text-[#075e63]">{item.period}</p>
            </div>
            <p className="mt-2 text-sm text-[#66736f]">{item.location}</p>
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
  )
}

export async function generateMetadata({ searchParams }: ResumePageProps): Promise<Metadata> {
  const locale = normalizeLocale((await searchParams).lang)
  return {
    title: copy[locale].metadataTitle,
    description: copy[locale].metadataDescription,
  }
}

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const locale = normalizeLocale((await searchParams).lang)
  const alternateLocale = locale === 'en' ? 'zh' : 'en'
  const t = copy[locale]
  const { education, experiences, honors, profileSummary, skillGroups } = getProfile(locale)
  const internships = experiences.filter((item) => item.kind === 'internship')
  const projects = experiences.filter((item) => item.kind === 'project')

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <section className="border-b border-black/10 pb-10">
        <p className="text-sm font-semibold uppercase text-[#075e63]">{t.eyebrow}</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-semibold text-[#102022]">{locale === 'zh' ? '邢梓韬' : 'Zitao Xing'}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#31413f]">{profileSummary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={contact.resumeHref[locale]}
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#075e63] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#064d51]"
            >
              <Download size={17} aria-hidden="true" />
              {t.download}
            </Link>
            <Link
              href={contact.resumeHref[alternateLocale]}
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-[#075e63]/25 bg-white/70 px-5 py-3 text-sm font-semibold text-[#075e63] transition hover:border-[#075e63]/50"
            >
              <Download size={17} aria-hidden="true" />
              {t.alternateDownload}
            </Link>
          </div>
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
        <h2 className="text-2xl font-semibold text-[#102022]">{t.education}</h2>
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
              {item.detail ? <p className="mt-3 leading-7 text-[#31413f]">{item.detail}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <ExperienceSection title={t.internships} items={internships} />
      <ExperienceSection title={t.projects} items={projects} />

      <section className="grid gap-8 border-t border-black/10 py-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-[#102022]">{t.honors}</h2>
          <ul className="mt-5 space-y-3 leading-7 text-[#31413f]">
            {honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#102022]">{t.skills}</h2>
          <div className="mt-5 grid gap-4">
            {skillGroups.map((group) => (
              <div key={group.name}>
                <p className="font-semibold text-[#075e63]">{group.name}</p>
                <p className="mt-1 leading-7 text-[#31413f]">{group.items.join(locale === 'zh' ? '、' : ', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
