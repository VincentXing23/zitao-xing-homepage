import type { Metadata } from 'next'
import { ResearchField } from '@/components/ResearchField'
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
  ArrowUpRight,
  ArrowDown,
  Network,
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
    educationHeading: 'A foundation in mathematics.',
    projectEyebrow: 'Project Spotlight',
    projectHeading: 'Connecting mathematical knowledge.',
    projectCards: [
      ['Course graph', '95 course objects connected by 216 knowledge-graph relationships.'],
      ['Retrieval pipeline', 'Vector recall, reranking, graph expansion, and evidence-chain display.'],
      ['Technical stack', 'Neo4j, Qdrant, BGE embeddings and reranker, Flask.'],
    ],
    internshipEyebrow: 'Internships',
    internshipHeading: 'Ideas, tested in the real world.',
    projectsEyebrow: 'Projects & Research',
    projectsHeading: 'From equations to working systems.',
    fullResume: 'Full resume',
    skillsEyebrow: 'Skills & Interests',
    skillsHeading: 'A toolkit for curiosity.',
    honors: 'Honors & Awards',
    blogEyebrow: 'Blog',
    blogHeading: 'Thinking, in the open.',
    readBlog: 'Read blog',
    contactEyebrow: 'Contact',
    contactHeading: 'The next idea starts with a conversation.',
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
      ['研究与实践', 'AI for Science 研究复现、Agent 开发与 GraphRAG'],
      ['硕士阶段', '2026年9月入读厦门大学，研究方向为运筹学'],
      ['常用工具与方法', 'Python、Neo4j、Qdrant、向量检索、重排序与 CUDA'],
    ],
    educationEyebrow: '教育经历',
    educationHeading: '数学学习与海外访学',
    projectEyebrow: '重点项目',
    projectHeading: '用知识图谱辅助数学学习',
    projectCards: [
      ['课程图谱', '95 个课程对象，通过 216 条知识图谱关系连接。'],
      ['检索流程', '向量召回、结果重排、图谱扩展与证据链展示。'],
      ['技术栈', 'Neo4j、Qdrant、BGE 向量模型与重排模型、Flask。'],
    ],
    internshipEyebrow: '实习经历',
    internshipHeading: '从科研训练到行业实践',
    projectsEyebrow: '科研与项目经历',
    projectsHeading: '数值计算与人工智能实践',
    fullResume: '完整简历',
    skillsEyebrow: '技能与兴趣',
    skillsHeading: '研究工具与日常兴趣',
    honors: '竞赛与荣誉',
    blogEyebrow: '博客',
    blogHeading: '学习笔记与研究随想',
    readBlog: '查看博客',
    contactEyebrow: '联系我',
    contactHeading: '欢迎交流数学、\n科研与技术问题',
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

  const zh = locale === 'zh'
  const resumeHref = zh ? '/resume?lang=zh' : '/resume'
  const sectionTitle = (number: string, label: string, title: string) => (
    <div className="section-heading">
      <p className="section-eyebrow"><span>{number}</span>{label}</p>
      <h2>{title}</h2>
    </div>
  )

  return (
    <div className="portfolio-home">
      <section className="hero-v2" id="top">
        <div className="page-shell hero-layout">
          <div className="hero-editorial">
            <p className="hero-kicker"><span className="status-light" />{zh ? '应用数学 / AI FOR SCIENCE' : 'APPLIED MATHEMATICS / AI FOR SCIENCE'}</p>
            <h1 className={zh ? 'display-name display-name-zh' : 'display-name'}>{zh ? '邢梓韬' : <>Zitao <br />Xing<span className="name-period">.</span></>}</h1>
            {zh && <p className="name-romanized">ZITAO XING<span> / </span>厦门大学</p>}
            <div className="hero-intersections">{t.intersection.map((item, i) => <span key={item}>{i > 0 && <b>×</b>}{item}</span>)}</div>
            <p className="hero-description">{profileSummary}</p>
            <div className="hero-links">
              <Link className="button-primary" href="#research">{zh ? '了解科研项目' : 'Explore my work'}<ArrowDown size={17} /></Link>
              <Link className="button-outline" href={resumeHref}>{t.viewResume}<ArrowUpRight size={18} /></Link>
              <Link className="icon-link" href={getLocaleHref(locale)} aria-label={t.downloadResume}><Download size={20} /></Link>
            </div>
            <div className="hero-location"><MapPin size={14} /><span>{zh ? '中国 · 厦门' : 'Xiamen, China'}</span><i /><span>MATHEMATICS → POSSIBILITY</span></div>
          </div>
          <ResearchField locale={locale} />
        </div>
        <div className="page-shell hero-baseline"><span>RESEARCH / ENGINEERING / EXPLORATION</span><a href="#research">{zh ? '继续浏览' : 'SCROLL TO EXPLORE'}<ArrowDown size={13} /></a></div>
      </section>

      <section className="focus-ribbon">
        <div className="page-shell focus-ribbon-grid">
          {t.stats.map(([label, value], i) => <div key={label}><span className="ribbon-number">0{i + 1}</span><div><p>{label}</p><span>{value}</span></div></div>)}
        </div>
      </section>

      <section className="project-spotlight portfolio-section" id="research">
        <div className="page-shell">
          {sectionTitle('01', zh ? '重点项目 / PROJECT SPOTLIGHT' : 'PROJECT SPOTLIGHT', t.projectHeading)}
          <div className="spotlight-layout">
            <article className="spotlight-story">
              <div className="project-category"><Network size={17} /><span>{zh ? '泛函分析 × 知识图谱 × 人工智能' : 'FUNCTIONAL ANALYSIS × KNOWLEDGE GRAPHS × AI'}</span></div>
              <h3>Graph<span>RAG</span><span className="project-name-sub">{zh ? '泛函分析课程知识检索系统' : 'A knowledge system for functional analysis'}</span></h3>
              <p className="project-role">{project.role} <span>/</span> {project.period}</p>
              <p className="project-summary">{project.bullets[0]}</p>
              <div className="project-numbers"><div><strong>95</strong><span>{zh ? '课程对象（节点）' : 'Course objects'}</span></div><div><strong>216</strong><span>{zh ? '图谱关系（边）' : 'Graph relationships'}</span></div><div className="project-year"><span>2025<br />— 2026</span><ArrowUpRight size={28} /></div></div>
              <div className="project-stack">{['Neo4j', 'Qdrant', 'BGE-M3', 'Flask'].map(item => <span key={item}>{item}</span>)}</div>
            </article>
            <div className="retrieval-panel">
              <div className="panel-topline"><span><i /> RETRIEVAL ARCHITECTURE</span><BrainCircuit size={19} /></div>
              <p className="retrieval-question">{zh ? '检索课程知识，并展示相关证据。' : 'From a question to a chain of evidence.'}</p>
              <ol className="pipeline">
                {(zh ? [['01', '语义检索', '自然语言 → 向量召回'], ['02', '结果重排序', 'BGE Reranker → 按相关性排序'], ['03', '关联知识扩展', '查找相关概念、定理与例题'], ['04', '证据链展示', '整合关联知识 → 展示来源依据']] : [['01', 'Semantic retrieval', 'Natural language → vector recall'], ['02', 'Relevance reranking', 'BGE Reranker → selected evidence'], ['03', 'Graph expansion', 'Concepts · theorems · worked examples'], ['04', 'Evidence chain', 'Connected context → traceable evidence']]).map(([n, name, desc]) => <li key={n}><span>{n}</span><div><h4>{name}</h4><p>{desc}</p></div><ArrowDown size={15} /></li>)}
              </ol>
              <p className="pipeline-caption">G = (V, E)<span>{zh ? '课程知识图谱 · 本地演示系统' : 'COURSE KNOWLEDGE GRAPH · LOCAL PROTOTYPE'}</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section selected-projects">
        <div className="page-shell">
          {sectionTitle('02', t.projectsEyebrow, t.projectsHeading)}
          <div className="project-archive">
            {otherProjects.map((item, index) => <article className="archive-card" key={item.id}>
              <div className="archive-card-top"><span>PROJECT / 0{index + 1}</span>{item.id === 'pde-numerical-methods' ? <span className="archive-symbol">∂</span> : item.id === 'aise-summer-camp' ? <BrainCircuit size={25} /> : <BookOpen size={25} />}</div>
              <p className="archive-date">{item.period}</p>
              <h3>{item.href ? <Link href={item.href} target="_blank" rel="noreferrer">{item.title}<ArrowUpRight size={19} /></Link> : item.title}</h3>
              <p className="archive-summary">{item.bullets[0]}</p>
              <div className="archive-foot"><span>{item.organization}</span><span>{item.role}</span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="page-shell experience-layout">
          <div>{sectionTitle('03', t.internshipEyebrow, t.internshipHeading)}<Link href={resumeHref} className="text-link">{t.fullResume}<ArrowUpRight size={17} /></Link></div>
          <div className="experience-list">{internships.map((item, index) => <article key={item.id} className="experience-row"><div className="experience-marker">0{index + 1}</div><div><p className="experience-date">{item.period}</p><h3>{item.href ? <Link href={item.href} target="_blank" rel="noreferrer">{item.organization}<ArrowUpRight size={16} /></Link> : item.organization}</h3><p className="experience-role">{item.role} <span>·</span> {item.location}</p><p className="experience-description">{item.bullets[0]}</p></div></article>)}</div>
        </div>
      </section>

      <section className="portfolio-section education-section">
        <div className="page-shell">
          {sectionTitle('04', t.educationEyebrow, t.educationHeading)}
          <div className="education-track">{education.map((item, i) => <article key={`${item.institution}-${item.period}`} className="education-stop"><span className="education-index">{zh ? (i === 0 ? '硕士阶段' : i === 1 ? '本科阶段' : '海外访学') : (i === 0 ? 'NEXT CHAPTER' : i === 1 ? 'FOUNDATION' : 'VISITING STUDY')}</span><div className="education-node"><GraduationCap size={20} /></div><p className="education-period">{item.period}</p><h3>{item.institution}</h3><p>{item.role}</p><span className="education-location">{item.location}</span>{item.detail && <p className="education-detail">{item.detail}</p>}</article>)}</div>
        </div>
      </section>

      <section className="portfolio-section toolbox-section">
        <div className="page-shell">
          {sectionTitle('05', t.skillsEyebrow, t.skillsHeading)}
          <div className="toolbox-layout"><div className="toolbox-groups">{skillGroups.map((group, i) => <article className="toolbox-group" key={group.name}><h3><span>0{i + 1}</span>{group.name}</h3><div>{group.items.map(item => <span className="skill-token" key={item}>{item}</span>)}</div></article>)}</div><aside className="honors-panel"><Trophy size={26} /><h3>{t.honors}</h3><ul>{honors.map((honor, i) => <li key={honor}><span>0{i + 1}</span>{honor}</li>)}</ul></aside></div>
        </div>
      </section>

      <section className="portfolio-section" id="journal">
        <div className="page-shell"><div className="heading-with-link">{sectionTitle('06', zh ? '博客 / FIELD NOTES' : 'FIELD NOTES / '+t.blogEyebrow, t.blogHeading)}<Link href={zh ? '/blog?lang=zh' : '/blog'} className="text-link">{t.readBlog}<ArrowUpRight size={17} /></Link></div>
          <div className="journal-list">{latestPosts.map((post, i) => <Link key={post.slug} href={`/blog/${post.slug}${zh ? '?lang=zh' : ''}`} className="journal-row"><span className="journal-index">0{i + 1}</span><div><p className="journal-meta">{post.date}<span>{post.tags.slice(0, 2).join(' / ')}</span></p><h3>{post.title}</h3><p>{post.summary}</p></div><ArrowUpRight className="journal-arrow" size={26} /></Link>)}</div>
        </div>
      </section>

      <section id="contact" className="contact-v2"><div className="page-shell"><p className="section-eyebrow"><span>07</span>{zh ? '联系我 / CONTACT' : 'LET’S CONNECT'}</p><div className="contact-layout"><h2>{t.contactHeading}</h2><div><Link className="contact-email" href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={24} /></Link><p>{zh ? '学术交流 / 科研合作 / 技术探讨' : 'ACADEMIC EXCHANGE / RESEARCH / TECHNOLOGY'}</p><Link className="contact-phone" href={contact.phoneHref}><Phone size={15} />{contact.phone}</Link></div></div><div className="contact-end"><span>∴ KEEP EXPLORING.</span><a href="#top">{zh ? '回到顶部' : 'BACK TO TOP'}<ArrowUpRight size={14} /></a></div></div></section>
    </div>
  )
}
