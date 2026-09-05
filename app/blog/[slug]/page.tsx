import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <Link
        href="/blog"
        className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-white/12 bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#52f4df]/35 hover:text-[#52f4df]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Blog
      </Link>
      <header className="mt-10 border-b border-white/10 pb-8">
        <p className="text-sm font-semibold text-[#52f4df]">{post.date}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--body-text)]">{post.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-sm bg-[#101d30] px-3 py-1 text-xs font-semibold text-[#52f4df]">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="article-body mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}
