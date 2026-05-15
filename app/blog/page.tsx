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
      <section className="border-b border-black/10 pb-10">
        <p className="text-sm font-semibold uppercase text-[#075e63]">Blog</p>
        <h1 className="mt-4 text-5xl font-semibold text-[#102022]">Notes and essays</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#31413f]">
          A place for mathematics, optimization, learning systems, and research notes.
        </p>
      </section>

      <section className="grid gap-4 py-10">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-black/10 bg-white/74 p-6">
            <p className="text-[#31413f]">No posts published yet.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-lg border border-black/10 bg-white/78 p-5 transition hover:-translate-y-0.5 hover:border-[#075e63]/35 hover:shadow-lg"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#075e63]">{post.date}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#102022]">{post.title}</h2>
                </div>
                <ArrowRight size={20} className="text-[#c8841d]" aria-hidden="true" />
              </div>
              <p className="mt-4 leading-7 text-[#31413f]">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#edf7f5] px-3 py-1 text-xs font-semibold text-[#075e63]">
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
