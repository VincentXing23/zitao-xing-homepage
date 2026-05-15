import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'content', 'blog')

export type BlogPost = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  content: string
}

type BlogFrontmatter = {
  title?: string
  date?: string
  summary?: string
  tags?: string[]
}

function normalizeSlug(filename: string) {
  return filename.replace(/\.mdx?$/, '')
}

function readPost(filename: string): BlogPost {
  const fullPath = path.join(blogDirectory, filename)
  const file = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(file)
  const frontmatter = data as BlogFrontmatter

  return {
    slug: normalizeSlug(filename),
    title: frontmatter.title ?? normalizeSlug(filename),
    date: frontmatter.date ?? '',
    summary: frontmatter.summary ?? '',
    tags: frontmatter.tags ?? [],
    content,
  }
}

export function getAllPosts() {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((filename) => /\.mdx?$/.test(filename))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string) {
  const posts = getAllPosts()
  return posts.find((post) => post.slug === slug)
}
