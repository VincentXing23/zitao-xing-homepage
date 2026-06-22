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
import { contact, education, experiences, honors, profileSummary, skillGroups } from '@/lib/profile'

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 2)
  const project = experiences[1]

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
              Applied Mathematics · Machine Learning · GraphRAG
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] text-[#102022] sm:text-6xl">
              Zitao Xing
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#31413f] sm:text-xl">
              {profileSummary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/resume"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#075e63] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#075e63]/18 transition hover:bg-[#064d51]"
              >
                View Resume
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href={contact.resumeHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#102022]/18 bg-white/70 px-5 py-3 text-sm font-semibold text-[#102022] transition hover:border-[#075e63]/45 hover:text-[#075e63]"
              >
                <Download size={17} aria-hidden="true" />
                Download PDF
              </Link>
              <Link
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#102022]/18 bg-white/70 px-5 py-3 text-sm font-semibold text-[#102022] transition hover:border-[#075e63]/45 hover:text-[#075e63]"
              >
                <Mail size={17} aria-hidden="true" />
                Email
              </Link>
            </div>
            <div className="mt-9 grid max-w-2xl gap-3 text-sm text-[#31413f] sm:grid-cols-2">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-[#075e63]" aria-hidden="true" />
                Xiamen University, China
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
          {[
            ['Current focus', 'GraphRAG for functional analysis and numerical PDE methods'],
            ['Next step', 'Incoming M.S. in Operations Research at XMU · Sep. 2026'],
            ['Research toolkit', 'Neo4j, Qdrant, embeddings, reranking, CUDA'],
          ].map(([label, value]) => (
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
            <p className="text-sm font-semibold uppercase text-[#bf5142]">Education</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">
              Mathematics training in Xiamen and San Diego, with graduate study ahead.
            </h2>
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
                <p className="mt-3 leading-7 text-[#31413f]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf7f5]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#075e63]">Project Spotlight</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">
              Exploring GraphRAG support for functional analysis learning.
            </h2>
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
              {[
                ['Course graph', '95 course objects connected by 216 knowledge-graph relationships.'],
                ['Retrieval pipeline', 'Vector recall, reranking, graph expansion, and evidence-chain display.'],
                ['Technical stack', 'Neo4j, Qdrant, BGE embeddings and reranker, Flask.'],
              ].map(([label, detail]) => (
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
            <p className="text-sm font-semibold uppercase text-[#bf5142]">Experience</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">
              Academic programs, research projects, and applied work.
            </h2>
          </div>
          <Link
            href="/resume"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#102022]/18 px-4 py-2 text-sm font-semibold text-[#102022] transition hover:border-[#075e63]/45 hover:text-[#075e63]"
          >
            Full resume
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {experiences.slice(1).map((item) => (
            <article key={`${item.title}-${item.period}`} className="rounded-lg border border-black/10 bg-white/72 p-5">
              <p className="text-sm font-semibold text-[#075e63]">{item.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#102022]">{item.title}</h3>
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
            <p className="text-sm font-semibold uppercase text-[#075e63]">Skills & Interests</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">
              Tools for mathematical research, machine learning, and rigorous problem solving.
            </h2>
            <div className="mt-8 rounded-lg border border-[#c8841d]/35 bg-[#fff3dc] p-5">
              <div className="flex items-center gap-3">
                <Trophy className="text-[#c8841d]" size={22} aria-hidden="true" />
                <p className="font-semibold text-[#102022]">Honors & Awards</p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#31413f]">
                {honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <article key={group.name} className="rounded-lg border border-black/10 bg-white p-5">
                <div className="flex items-center gap-3">
                  {group.name.includes('Programming') ? (
                    <Code2 size={20} className="text-[#075e63]" aria-hidden="true" />
                  ) : group.name.includes('Interests') ? (
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
            <p className="text-sm font-semibold uppercase text-[#bf5142]">Blog</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#102022] sm:text-4xl">
              Notes on mathematics, learning, and systems.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#102022]/18 px-4 py-2 text-sm font-semibold transition hover:border-[#075e63]/45 hover:text-[#075e63]"
          >
            Read blog
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
            <p className="text-sm font-semibold uppercase text-[#f0b54f]">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Open to academic conversations.</h2>
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
