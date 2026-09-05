import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes from Zitao Xing on mathematics, optimization, AI-assisted learning, and study.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <section className="border-b border-white/10 pb-10">
        <p className="text-sm font-semibold uppercase text-[#52f4df]">Blog</p>
        <h1 className="mt-4 text-5xl font-semibold text-[var(--foreground)]">Notes and essays</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--body-text)]">
          A place for mathematics, optimization, learning systems, and research notes.
        </p>
      </section>

      <section className="grid gap-4 py-10">
        {posts.length === 0 ? (
          <div className="rounded-sm border border-white/10 bg-[var(--surface)] p-6">
            <p className="text-[var(--body-text)]">No posts published yet.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-sm border border-white/10 bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[#52f4df]/35 hover:shadow-lg"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#52f4df]">{post.date}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{post.title}</h2>
                </div>
                <ArrowRight size={20} className="text-[#e8ff77]" aria-hidden="true" />
              </div>
              <p className="mt-4 leading-7 text-[var(--body-text)]">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-sm bg-[#101d30] px-3 py-1 text-xs font-semibold text-[#52f4df]">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  )
}
