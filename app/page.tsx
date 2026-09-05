import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sigma,
  Trophy,
} from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { contact, featuredExperienceId, getProfile, normalizeLocale, type Locale } from '@/lib/profile'

type HomePageProps = {
  searchParams: Promise<{ lang?: string | string[] }>
}

const copy = {
  en: {
    metadataTitle: 'Zitao Xing',
    metadataDescription:
      'Zitao Xing is an incoming applied mathematics graduate student working on AI for Science, agent development, numerical methods, and graph-enhanced AI systems.',
    focusPill: 'Applied Mathematics · AI for Science · Agent Development',
    intersection: ['Mathematics', 'Artificial Intelligence', 'Scientific Computing'],
    viewResume: 'View Resume',
    downloadResume: 'Download PDF',
    email: 'Email',
    stats: [
      ['Current focus', 'AI for Science reproduction, agent development, and GraphRAG'],
      ['Next step', 'Incoming M.S. in Operations Research at XMU · Sep. 2026'],
      ['Research toolkit', 'Python, Neo4j, Qdrant, embeddings, reranking, CUDA'],
    ],
    educationEyebrow: 'Education',
    educationHeading: 'Mathematics training in Xiamen and San Diego, with graduate study ahead.',
    projectEyebrow: 'Project Spotlight',
    projectHeading: 'Exploring GraphRAG support for functional analysis learning.',
    projectCards: [
      ['Course graph', '95 course objects connected by 216 knowledge-graph relationships.'],
      ['Retrieval pipeline', 'Vector recall, reranking, graph expansion, and evidence-chain display.'],
      ['Technical stack', 'Neo4j, Qdrant, BGE embeddings and reranker, Flask.'],
    ],
    internshipEyebrow: 'Internships',
    internshipHeading: 'Applied AI work across research reproduction, knowledge systems, and industry practice.',
    projectsEyebrow: 'Projects & Research',
    projectsHeading: 'Research projects, engineering prototypes, and academic programs.',
    fullResume: 'Full resume',
    skillsEyebrow: 'Skills & Interests',
    skillsHeading: 'Tools for mathematical research, machine learning, and rigorous problem solving.',
    honors: 'Honors & Awards',
    blogEyebrow: 'Blog',
    blogHeading: 'Notes on mathematics, learning, and systems.',
    readBlog: 'Read blog',
    contactEyebrow: 'Contact',
    contactHeading: 'Open to academic and technical conversations.',
  },
  zh: {
    metadataTitle: '邢梓韬',
    metadataDescription: '邢梓韬的个人主页，关注 AI for Science、Agent 开发、数值方法与图增强人工智能系统。',
    focusPill: '应用数学 · AI for Science · Agent 开发',
    intersection: ['数学', '人工智能', '科学计算'],
    viewResume: '查看简历',
    downloadResume: '下载 PDF',
    email: '发送邮件',
    stats: [
      ['当前方向', 'AI for Science 科研复现、Agent 开发与 GraphRAG'],
      ['下一阶段', '2026年9月进入厦门大学攻读运筹学方向硕士'],
      ['研究工具', 'Python、Neo4j、Qdrant、向量检索、重排、CUDA'],
    ],
    educationEyebrow: '教育经历',
    educationHeading: '在厦门与圣地亚哥接受数学训练，即将进入研究生阶段。',
    projectEyebrow: '项目聚焦',
    projectHeading: '探索 GraphRAG 在泛函分析课程学习中的应用。',
    projectCards: [
      ['课程图谱', '95 个课程对象，通过 216 条知识图谱关系连接。'],
      ['检索流程', '向量召回、结果重排、图谱扩展与证据链展示。'],
      ['技术栈', 'Neo4j、Qdrant、BGE 向量模型与重排模型、Flask。'],
    ],
    internshipEyebrow: '实习经历',
    internshipHeading: '围绕科研复现、知识系统与行业实践开展应用型人工智能工作。',
    projectsEyebrow: '科研与项目经历',
    projectsHeading: '科研训练、工程原型与学术活动。',
    fullResume: '完整简历',
    skillsEyebrow: '技能与兴趣',
    skillsHeading: '面向数学研究、机器学习与严谨问题求解的工具与能力。',
    honors: '竞赛与荣誉',
    blogEyebrow: '博客',
    blogHeading: '关于数学、学习与系统的笔记。',
    readBlog: '查看博客',
    contactEyebrow: '联系我',
    contactHeading: '欢迎交流学术与技术问题。',
  },
} as const

function getLocaleHref(locale: Locale) {
  return contact.resumeHref[locale]
}

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const locale = normalizeLocale((await searchParams).lang)
  return {
    title: copy[locale].metadataTitle,
    description: copy[locale].metadataDescription,
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const locale = normalizeLocale((await searchParams).lang)
  const t = copy[locale]
  const { education, experiences, honors, profileSummary, skillGroups } = getProfile(locale)
  const latestPosts = getAllPosts().slice(0, 2)
  const project = experiences.find((item) => item.id === featuredExperienceId)
  const internships = experiences.filter((item) => item.kind === 'internship')
  const otherProjects = experiences.filter(
    (item) => item.kind === 'project' && item.id !== featuredExperienceId,
  )

  if (!project) {
    throw new Error(`Featured experience not found: ${featuredExperienceId}`)
  }

  return (
    <>
      <section className="cyber-hero relative isolate flex min-h-[78svh] overflow-hidden">
        <Image
          src="/static/images/math-ai-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image absolute inset-0 -z-20 object-cover object-[58%_center]"
        />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="mx-auto flex w-full max-w-7xl items-center px-5 py-14 sm:px-8">
          <div className="hero-copy max-w-3xl">
            <p className="focus-pill mb-5 inline-flex items-center gap-2 rounded-sm border border-[#52f4df]/25 bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[#52f4df]">
              <Sigma size={17} aria-hidden="true" />
              {t.focusPill}
            </p>
            <h1 className="hero-title max-w-3xl font-semibold leading-[1.04] text-[var(--foreground)]">
              {locale === 'zh' ? '邢梓韬' : 'Zitao Xing'}
            </h1>
            <p className="discipline-line mt-5 flex flex-wrap items-center gap-x-3 gap-y-2" aria-label={locale === 'zh' ? '交叉研究方向' : 'Interdisciplinary interests'}>
              {t.intersection.map((discipline, index) => (
                <span key={discipline} className="inline-flex items-center gap-3">
                  {index > 0 ? <span className="discipline-cross" aria-hidden="true">×</span> : null}
                  <span>{discipline}</span>
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--body-text)] sm:text-xl">{profileSummary}</p>
            <div className="hero-actions mt-8 flex flex-wrap gap-3">
              <Link
                href="/resume"
                className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-[#52f4df] px-5 py-3 text-sm font-semibold text-[#06111a] shadow-lg shadow-[#52f4df]/18 transition hover:bg-[#9cfff0]"
              >
                {t.viewResume}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href={getLocaleHref(locale)}
                className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-[#52f4df]/18 bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#52f4df]/45 hover:text-[#52f4df]"
              >
                <Download size={17} aria-hidden="true" />
                {t.downloadResume}
              </Link>
              <Link
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-[#52f4df]/18 bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#52f4df]/45 hover:text-[#52f4df]"
              >
                <Mail size={17} aria-hidden="true" />
                {t.email}
              </Link>
            </div>
            <div className="mt-9 grid max-w-2xl gap-3 text-sm text-[var(--body-text)] sm:grid-cols-2">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-[#52f4df]" aria-hidden="true" />
                {contact.location[locale]}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone size={16} className="text-[#52f4df]" aria-hidden="true" />
                {contact.phone}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="signal-strip border-y border-white/10 bg-[#080d19] text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-3 sm:px-8">
          {t.stats.map(([label, value]) => (
            <div key={label} className="min-h-24 border-l border-white/18 pl-5">
              <p className="text-xs font-semibold uppercase text-[#e8ff77]">{label}</p>
              <p className="mt-2 text-lg font-semibold leading-7">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[#ff70ce]">{t.educationEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">{t.educationHeading}</h2>
          </div>
          <div className="grid gap-4">
            {education.map((item) => (
              <article
                key={`${item.institution}-${item.period}`}
                className="rounded-sm border border-white/10 bg-[var(--surface)] p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.institution}</h3>
                    <p className="mt-1 text-[var(--body-text)]">{item.role}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#52f4df]">{item.period}</p>
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">{item.location}</p>
                {item.detail ? <p className="mt-3 leading-7 text-[var(--body-text)]">{item.detail}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-spotlight">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#52f4df]">{t.projectEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">{t.projectHeading}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-sm border border-[#52f4df]/18 bg-[var(--surface)] p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-sm bg-[#52f4df] text-[#06111a]">
                  <BrainCircuit size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--foreground)]">{project.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#52f4df]">
                    {project.role} · {project.period}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-4 text-[var(--body-text)]">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 leading-7">
                    <span className="mt-3 size-2 shrink-0 rounded-sm bg-[#e8ff77]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {t.projectCards.map(([label, detail]) => (
                <div key={label} className="rounded-sm border border-white/10 bg-[#0b1222] p-5">
                  <p className="font-semibold text-[var(--foreground)]">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#ff70ce]">{t.internshipEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">{t.internshipHeading}</h2>
          </div>
          <Link
            href="/resume"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sm border border-[#52f4df]/18 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#52f4df]/45 hover:text-[#52f4df]"
          >
            {t.fullResume}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {internships.map((item) => (
            <article key={item.id} className="rounded-sm border border-white/10 bg-[var(--surface)] p-5">
              <p className="text-sm font-semibold text-[#52f4df]">{item.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                {item.href ? (
                  <Link href={item.href} target="_blank" rel="noreferrer" className="hover:text-[#52f4df] hover:underline">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {item.organization} · {item.location}
              </p>
              <p className="mt-4 leading-7 text-[var(--body-text)]">{item.bullets[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#101d30]/65">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#52f4df]">{t.projectsEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">{t.projectsHeading}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {otherProjects.map((item) => (
              <article key={item.id} className="rounded-sm border border-white/10 bg-[var(--surface)] p-5">
                <p className="text-sm font-semibold text-[#52f4df]">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#52f4df] hover:underline"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {item.organization} · {item.location}
                </p>
                <p className="mt-4 leading-7 text-[var(--body-text)]">{item.bullets[0]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1222]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[#52f4df]">{t.skillsEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">{t.skillsHeading}</h2>
            <div className="mt-8 rounded-sm border border-[#e8ff77]/35 bg-[#1d2130] p-5">
              <div className="flex items-center gap-3">
                <Trophy className="text-[#e8ff77]" size={22} aria-hidden="true" />
                <p className="font-semibold text-[var(--foreground)]">{t.honors}</p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--body-text)]">
                {honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <article key={group.name} className="rounded-sm border border-white/10 bg-[var(--surface)] p-5">
                <div className="flex items-center gap-3">
                  {index === 0 ? (
                    <Code2 size={20} className="text-[#52f4df]" aria-hidden="true" />
                  ) : index >= 2 ? (
                    <BookOpen size={20} className="text-[#52f4df]" aria-hidden="true" />
                  ) : (
                    <GraduationCap size={20} className="text-[#52f4df]" aria-hidden="true" />
                  )}
                  <h3 className="font-semibold text-[var(--foreground)]">{group.name}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-sm border border-[#52f4df]/16 bg-[#101d30] px-3 py-1.5 text-sm text-[var(--body-text)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#ff70ce]">{t.blogEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">{t.blogHeading}</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sm border border-[#52f4df]/18 px-4 py-2 text-sm font-semibold transition hover:border-[#52f4df]/45 hover:text-[#52f4df]"
          >
            {t.readBlog}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-sm border border-white/10 bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[#52f4df]/35 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-[#52f4df]">{post.date}</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{post.title}</h3>
              <p className="mt-3 leading-7 text-[var(--body-text)]">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#080d19] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[#e8ff77]">{t.contactEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.contactHeading}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-14 items-center gap-3 rounded-sm border border-white/16 px-5 py-4 transition hover:border-white/38"
            >
              <Mail size={20} aria-hidden="true" />
              <span className="break-all text-sm font-semibold">{contact.email}</span>
            </Link>
            <Link
              href={contact.phoneHref}
              className="inline-flex min-h-14 items-center gap-3 rounded-sm border border-white/16 px-5 py-4 transition hover:border-white/38"
            >
              <Phone size={20} aria-hidden="true" />
              <span className="text-sm font-semibold">{contact.phone}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
