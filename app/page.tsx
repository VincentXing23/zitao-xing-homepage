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
    experienceEyebrow: 'Experience',
    experienceHeading: 'Research, engineering projects, academic programs, and applied work.',
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
    experienceEyebrow: '经历',
    experienceHeading: '科研、工程项目、学术活动与行业实践。',
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
  const otherExperiences = experiences.filter((item) => item.id !== featuredExperienceId)

  if (!project) {
    throw new Error(`Featured experience not found: ${featuredExperienceId}`)
  }

  return (
    <>
      <section className="relative isolate flex min-h-[78svh] overflow-hidden">
        <Image
          src="/static/images/math-ai-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,250,240,0.98)_0%,rgba(255,250,240,0.84)_37%,rgba(16,32,34,0.20)_72%,rgba(16,32,34,0.54)_100%)]" />
        <div className="mx-auto flex w-full max-w-7xl items-center px-5 py-14 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#075e63]/25 bg-white/58 px-4 py-2 text-sm font-semibold text-[#075e63]">
              <Sigma size={17} aria-hidden="true" />
              {t.focusPill}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] text-[#102022] sm:text-6xl">
              {locale === 'zh' ? '邢梓韬' : 'Zitao Xing'}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#31413f] sm:text-xl">{profileSummary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/resume"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#075e63] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#075e63]/18 transition hover:bg-[#064d51]"
              >
                {t.viewResume}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href={getLocaleHref(locale)}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#102022]/18 bg-white/70 px-5 py-3 text-sm font-semibold text-[#102022] transition hover:border-[#075e63]/45 hover:text-[#075e63]"
              >
                <Download size={17} aria-hidden="true" />
                {t.downloadResume}
              </Link>
              <Link
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#102022]/18 bg-white/70 px-5 py-3 text-sm font-semibold text-[#102022] transition hover:border-[#075e63]/45 hover:text-[#075e63]"
              >
                <Mail size={17} aria-hidden="true" />
                {t.email}
              </Link>
            </div>
            <div className="mt-9 grid max-w-2xl gap-3 text-sm text-[#31413f] sm:grid-cols-2">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-[#075e63]" aria-hidden="true" />
                {contact.location[locale]}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone size={16} className="text-[#075e63]" aria-hidden="true" />
                {contact.phone}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#102022] text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-3 sm:px-8">
          {t.stats.map(([label, value]) => (
            <div key={label} className="min-h-24 border-l border-white/18 pl-5">
              <p className="text-xs font-semibold uppercase text-[#f0b54f]">{label}</p>
              <p className="mt-2 text-lg font-semibold leading-7">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[#bf5142]">{t.educationEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">{t.educationHeading}</h2>
          </div>
          <div className="grid gap-4">
            {education.map((item) => (
              <article
                key={`${item.institution}-${item.period}`}
                className="rounded-lg border border-black/10 bg-white/72 p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#102022]">{item.institution}</h3>
                    <p className="mt-1 text-[#31413f]">{item.role}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#075e63]">{item.period}</p>
                </div>
                <p className="mt-3 text-sm text-[#66736f]">{item.location}</p>
                {item.detail ? <p className="mt-3 leading-7 text-[#31413f]">{item.detail}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf7f5]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#075e63]">{t.projectEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">{t.projectHeading}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-lg border border-[#075e63]/18 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#075e63] text-white">
                  <BrainCircuit size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-[#102022]">{project.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#075e63]">
                    {project.role} · {project.period}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-4 text-[#31413f]">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 leading-7">
                    <span className="mt-3 size-2 shrink-0 rounded-full bg-[#c8841d]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {t.projectCards.map(([label, detail]) => (
                <div key={label} className="rounded-lg border border-black/10 bg-[#fffaf0] p-5">
                  <p className="font-semibold text-[#102022]">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#66736f]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#bf5142]">{t.experienceEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">{t.experienceHeading}</h2>
          </div>
          <Link
            href="/resume"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#102022]/18 px-4 py-2 text-sm font-semibold text-[#102022] transition hover:border-[#075e63]/45 hover:text-[#075e63]"
          >
            {t.fullResume}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {otherExperiences.map((item) => (
            <article key={item.id} className="rounded-lg border border-black/10 bg-white/72 p-5">
              <p className="text-sm font-semibold text-[#075e63]">{item.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#102022]">
                {item.href ? (
                  <Link href={item.href} target="_blank" rel="noreferrer" className="hover:text-[#075e63] hover:underline">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-1 text-sm text-[#66736f]">
                {item.organization} · {item.location}
              </p>
              <p className="mt-4 leading-7 text-[#31413f]">{item.bullets[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf0]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[#075e63]">{t.skillsEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">{t.skillsHeading}</h2>
            <div className="mt-8 rounded-lg border border-[#c8841d]/35 bg-[#fff3dc] p-5">
              <div className="flex items-center gap-3">
                <Trophy className="text-[#c8841d]" size={22} aria-hidden="true" />
                <p className="font-semibold text-[#102022]">{t.honors}</p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#31413f]">
                {honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <article key={group.name} className="rounded-lg border border-black/10 bg-white p-5">
                <div className="flex items-center gap-3">
                  {index === 0 ? (
                    <Code2 size={20} className="text-[#075e63]" aria-hidden="true" />
                  ) : index >= 2 ? (
                    <BookOpen size={20} className="text-[#075e63]" aria-hidden="true" />
                  ) : (
                    <GraduationCap size={20} className="text-[#075e63]" aria-hidden="true" />
                  )}
                  <h3 className="font-semibold text-[#102022]">{group.name}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#075e63]/16 bg-[#edf7f5] px-3 py-1.5 text-sm text-[#31413f]"
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
            <p className="text-sm font-semibold uppercase text-[#bf5142]">{t.blogEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">{t.blogHeading}</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#102022]/18 px-4 py-2 text-sm font-semibold transition hover:border-[#075e63]/45 hover:text-[#075e63]"
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
              className="rounded-lg border border-black/10 bg-white/72 p-5 transition hover:-translate-y-0.5 hover:border-[#075e63]/35 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-[#075e63]">{post.date}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#102022]">{post.title}</h3>
              <p className="mt-3 leading-7 text-[#31413f]">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#102022] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[#f0b54f]">{t.contactEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.contactHeading}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-14 items-center gap-3 rounded-lg border border-white/16 px-5 py-4 transition hover:border-white/38"
            >
              <Mail size={20} aria-hidden="true" />
              <span className="break-all text-sm font-semibold">{contact.email}</span>
            </Link>
            <Link
              href={contact.phoneHref}
              className="inline-flex min-h-14 items-center gap-3 rounded-lg border border-white/16 px-5 py-4 transition hover:border-white/38"
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
