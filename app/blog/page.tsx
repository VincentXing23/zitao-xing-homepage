import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { normalizeLocale } from '@/lib/profile'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes from Zitao Xing on mathematics, optimization, AI-assisted learning, and study.',
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const zh = normalizeLocale((await searchParams).lang) === 'zh'
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <section className="page-intro border-b border-white/10 pb-10">
        <p className="text-sm font-semibold uppercase text-[#52f4df]">{zh ? '博客' : 'Blog'}</p>
        <h1 className="mt-4 text-5xl font-semibold text-[var(--foreground)]">{zh ? '学习笔记与研究随想' : 'Thinking, in the open.'}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--body-text)]">
          {zh ? '记录数学与算法学习中的思考，以及科研和项目实践中的心得。' : 'Notes on mathematics, optimization, learning systems, and research.'}
        </p>
      </section>

      <section className="journal-list py-10">
        {posts.length === 0 ? (
          <div className="rounded-sm border border-white/10 bg-[var(--surface)] p-6">
            <p className="text-[var(--body-text)]">{zh ? '暂时还没有文章。' : 'No posts published yet.'}</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}${zh ? '?lang=zh' : ''}`} className="journal-row">
              <span className="journal-index">0{i + 1}</span>
              <div><p className="journal-meta">{post.date}<span>{post.tags.join(' / ')}</span></p>
              <h3>{post.title}</h3><p>{post.summary}</p></div><ArrowRight className="journal-arrow" size={24} />
            </Link>
          ))
        )}
      </section>
    </div>
  )
}
